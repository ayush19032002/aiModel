import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create plans
  const plans = await Promise.all([
    prisma.plan.upsert({
      where: { slug: 'starter' },
      update: {},
      create: {
        name: 'Starter',
        slug: 'starter',
        description: 'Perfect for small businesses',
        price: 29,
        currency: 'USD',
        interval: 'MONTHLY',
        maxBusinessProfiles: 1,
        maxLocations: 1,
        maxTeamMembers: 1,
        maxContacts: 100,
        maxMessages: 500,
        maxAIRequests: 50,
        apiRateLimit: 50,
        features: [
          '1 Business Profile',
          '100 Contacts',
          '500 Messages/month',
          '50 AI Requests',
          'Basic Analytics',
          'Email Support'
        ],
        isActive: true
      }
    }),
    prisma.plan.upsert({
      where: { slug: 'professional' },
      update: {},
      create: {
        name: 'Professional',
        slug: 'professional',
        description: 'For growing businesses',
        price: 79,
        currency: 'USD',
        interval: 'MONTHLY',
        maxBusinessProfiles: 5,
        maxLocations: 10,
        maxTeamMembers: 5,
        maxContacts: 1000,
        maxMessages: 5000,
        maxAIRequests: 500,
        apiRateLimit: 200,
        features: [
          '5 Business Profiles',
          '10 Locations',
          '1000 Contacts',
          '5000 Messages/month',
          '500 AI Requests',
          'Advanced Analytics',
          'Priority Support',
          'WhatsApp Integration',
          'CRM Features'
        ],
        isActive: true
      }
    }),
    prisma.plan.upsert({
      where: { slug: 'enterprise' },
      update: {},
      create: {
        name: 'Enterprise',
        slug: 'enterprise',
        description: 'For large organizations',
        price: 199,
        currency: 'USD',
        interval: 'MONTHLY',
        maxBusinessProfiles: -1, // Unlimited
        maxLocations: -1,
        maxTeamMembers: -1,
        maxContacts: -1,
        maxMessages: -1,
        maxAIRequests: -1,
        apiRateLimit: 1000,
        features: [
          'Unlimited Business Profiles',
          'Unlimited Locations',
          'Unlimited Contacts',
          'Unlimited Messages',
          'Unlimited AI Requests',
          'Custom Integrations',
          'Dedicated Support',
          'SLA Guarantee',
          'White-label Option'
        ],
        isActive: true
      }
    })
  ]);

  console.log('Created plans:', plans.map(p => p.name));

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@gbpgrowth.com' },
    update: {},
    create: {
      email: 'demo@gbpgrowth.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'USER',
      status: 'ACTIVE',
      settings: {
        create: {
          timezone: 'UTC',
          language: 'en',
          theme: 'system'
        }
      }
    }
  });

  console.log('Created demo user:', user.email);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gbpgrowth.com' },
    update: {},
    create: {
      email: 'admin@gbpgrowth.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      settings: {
        create: {
          timezone: 'UTC',
          language: 'en',
          theme: 'system'
        }
      }
    }
  });

  console.log('Created admin user:', admin.email);

  // Create sample business profile
  const businessProfile = await prisma.businessProfile.create({
    data: {
      userId: user.id,
      locationId: 'sample-location-001',
      name: 'Sample Restaurant',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'US',
      postalCode: '10001',
      phone: '+1 555-123-4567',
      website: 'https://samplerestaurant.com',
      categories: ['Restaurant', 'Food', 'Dining'],
      description: 'A wonderful restaurant serving delicious food in a cozy atmosphere.',
      isVerified: true,
      verificationStatus: 'VERIFIED',
      syncStatus: 'SUCCESS'
    }
  });

  console.log('Created sample business profile:', businessProfile.name);

  // Create sample reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        businessProfileId: businessProfile.id,
        googleReviewId: 'review-001',
        reviewerName: 'John Doe',
        rating: 5,
        comment: 'Amazing food and great service! Will definitely come back.',
        reviewTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isReplied: true,
        reply: 'Thank you so much for your kind words! We\'re glad you enjoyed your experience.',
        replyStatus: 'PUBLISHED'
      }
    }),
    prisma.review.create({
      data: {
        businessProfileId: businessProfile.id,
        googleReviewId: 'review-002',
        reviewerName: 'Jane Smith',
        rating: 4,
        comment: 'Good food but the service was a bit slow.',
        reviewTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isReplied: false,
        replyStatus: 'PENDING'
      }
    }),
    prisma.review.create({
      data: {
        businessProfileId: businessProfile.id,
        googleReviewId: 'review-003',
        reviewerName: 'Bob Johnson',
        rating: 5,
        comment: 'Best restaurant in town! Highly recommend the pasta.',
        reviewTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isReplied: true,
        reply: 'Thank you Bob! We\'re thrilled you loved our pasta.',
        replyStatus: 'PUBLISHED'
      }
    })
  ]);

  console.log('Created sample reviews:', reviews.length);

  // Create sample insights
  const insights = await prisma.insight.create({
    data: {
      businessProfileId: businessProfile.id,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      searchViews: 1250,
      mapsViews: 890,
      websiteClicks: 234,
      phoneCalls: 156,
      directionRequests: 89,
      bookings: 45,
      dailyMetrics: {
        data: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          searchViews: Math.floor(Math.random() * 50) + 30,
          mapsViews: Math.floor(Math.random() * 40) + 20,
          websiteClicks: Math.floor(Math.random() * 15) + 5,
          phoneCalls: Math.floor(Math.random() * 10) + 3
        }))
      }
    }
  });

  console.log('Created sample insights');

  // Create sample SEO audit
  const seoAudit = await prisma.seoAudit.create({
    data: {
      businessProfileId: businessProfile.id,
      overallScore: 78,
      grade: 'B',
      napScore: 90,
      categoryScore: 85,
      reviewScore: 88,
      keywordScore: 72,
      descriptionScore: 80,
      photoScore: 65,
      postScore: 70,
      speedScore: 75,
      findings: [
        {
          category: 'NAP',
          issue: 'Name, Address, Phone consistency',
          status: 'good',
          recommendation: 'Keep NAP consistent across all platforms'
        },
        {
          category: 'Photos',
          issue: 'Low number of photos',
          status: 'warning',
          recommendation: 'Add at least 10 more photos to improve visibility'
        },
        {
          category: 'Posts',
          issue: 'No recent posts',
          status: 'error',
          recommendation: 'Post at least weekly to engage customers'
        }
      ]
    }
  });

  console.log('Created sample SEO audit');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
