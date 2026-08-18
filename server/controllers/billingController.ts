import { Response } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
});

class BillingController {
  getPlans = async (req: AuthRequest, res: Response) => {
    try {
      const plans = await prisma.plan.findMany({
        where: { isActive: true },
        orderBy: { price: 'asc' }
      });

      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch plans' });
    }
  };

  getSubscription = async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user!.id },
        include: {
          plan: true,
          invoices: {
            take: 10,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  };

  createSubscription = async (req: AuthRequest, res: Response) => {
    try {
      const { planId, paymentMethodId } = req.body;

      const plan = await prisma.plan.findUnique({
        where: { id: planId }
      });

      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      // Create Stripe customer if not exists
      let subscription = await prisma.subscription.findUnique({
        where: { userId: req.user!.id }
      });

      let customerId = subscription?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: req.user!.email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId
          }
        });
        customerId = customer.id;
      }

      // Create Stripe subscription
      const stripeSubscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: plan.stripePriceId!,
            quantity: 1
          }
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent']
      });

      // Save subscription to database
      subscription = await prisma.subscription.upsert({
        where: { userId: req.user!.id },
        create: {
          userId: req.user!.id,
          planId: plan.id,
          stripeCustomerId: customerId,
          stripeSubscriptionId: stripeSubscription.id,
          status: stripeSubscription.status as any,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
        },
        update: {
          planId: plan.id,
          stripeSubscriptionId: stripeSubscription.id,
          status: stripeSubscription.status as any,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
        }
      });

      res.json({
        subscription,
        clientSecret: (stripeSubscription.latest_invoice as any)?.payment_intent?.client_secret
      });
    } catch (error) {
      console.error('Subscription creation error:', error);
      res.status(500).json({ error: 'Failed to create subscription' });
    }
  };

  cancelSubscription = async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user!.id }
      });

      if (!subscription || !subscription.stripeSubscriptionId) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      // Cancel at period end
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { cancelAtPeriodEnd: true }
      });

      res.json({ message: 'Subscription will be cancelled at period end' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel subscription' });
    }
  };

  handleStripeWebhook = async (req: any, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: 'Webhook signature verification failed' });
    }
  };

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: invoice.subscription as string }
    });

    if (subscription) {
      await prisma.invoice.create({
        data: {
          subscriptionId: subscription.id,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency,
          status: 'PAID',
          paidAt: new Date(invoice.status_transitions?.paid_at! * 1000),
          invoiceUrl: invoice.hosted_invoice_url
        }
      });
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: invoice.subscription as string }
    });

    if (subscription) {
      await prisma.invoice.create({
        data: {
          subscriptionId: subscription.id,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_due / 100,
          currency: invoice.currency,
          status: 'OPEN',
          dueDate: new Date(invoice.due_date! * 1000),
          invoiceUrl: invoice.hosted_invoice_url
        }
      });

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'PAST_DUE' }
      });
    }
  }

  private async handleSubscriptionDeleted(stripeSubscription: Stripe.Subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: stripeSubscription.id },
      data: {
        status: 'CANCELED',
        canceledAt: new Date(stripeSubscription.canceled_at! * 1000)
      }
    });
  }

  private async handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: stripeSubscription.id },
      data: {
        status: stripeSubscription.status as any,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
      }
    });
  }

  getInvoices = async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user!.id }
      });

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      const invoices = await prisma.invoice.findMany({
        where: { subscriptionId: subscription.id },
        orderBy: { createdAt: 'desc' }
      });

      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  };

  getInvoice = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const invoice = await prisma.invoice.findUnique({
        where: { id }
      });

      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }

      res.json(invoice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invoice' });
    }
  };

  validateCoupon = async (req: AuthRequest, res: Response) => {
    try {
      const { code } = req.body;

      const coupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase() }
      });

      if (!coupon || !coupon.isActive) {
        return res.status(404).json({ error: 'Invalid coupon' });
      }

      if (coupon.validUntil && coupon.validUntil < new Date()) {
        return res.status(400).json({ error: 'Coupon has expired' });
      }

      if (coupon.maxRedemptions && coupon.redemptions >= coupon.maxRedemptions) {
        return res.status(400).json({ error: 'Coupon usage limit reached' });
      }

      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate coupon' });
    }
  };

  getUsage = async (req: AuthRequest, res: Response) => {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: req.user!.id },
        include: { plan: true }
      });

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      res.json({
        businessProfilesUsed: subscription.businessProfilesUsed,
        locationsUsed: subscription.locationsUsed,
        teamMembersUsed: subscription.teamMembersUsed,
        contactsUsed: subscription.contactsUsed,
        messagesUsed: subscription.messagesUsed,
        aiRequestsUsed: subscription.aiRequestsUsed,
        limits: {
          maxBusinessProfiles: subscription.plan.maxBusinessProfiles,
          maxLocations: subscription.plan.maxLocations,
          maxTeamMembers: subscription.plan.maxTeamMembers,
          maxContacts: subscription.plan.maxContacts,
          maxMessages: subscription.plan.maxMessages,
          maxAIRequests: subscription.plan.maxAIRequests
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch usage' });
    }
  };
}

export { BillingController };
