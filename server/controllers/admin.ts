import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';

const prisma = new PrismaClient();

class AdminController {
  getDashboard = async (req: AuthRequest, res: Response) => {
    try {
      const [
        totalUsers,
        activeSubscriptions,
        totalRevenue,
        monthlyRevenue,
        apiUsage,
        queueStatus
      ] = await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({ where: { status: 'ACTIVE' } }),
        prisma.invoice.aggregate({
          where: { status: 'PAID' },
          _sum: { amount: true }
        }),
        prisma.invoice.aggregate({
          where: {
            status: 'PAID',
            createdAt: {
              gte: new Date(new Date().setDate(1))
            }
          },
          _sum: { amount: true }
        }),
        prisma.apiUsage.count(),
        prisma.queueJob.count({ where: { status: 'PROCESSING' } })
      ]);

      res.json({
        totalUsers,
        activeSubscriptions,
        totalRevenue: totalRevenue._sum.amount || 0,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        apiUsage,
        queueStatus
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
  };

  getUsers = async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 20, search, status, role } = req.query;

      const where: any = {};

      if (search) {
        where.OR = [
          { email: { contains: search as string, mode: 'insensitive' } },
          { name: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      if (status) {
        where.status = status as string;
      }

      if (role) {
        where.role = role as string;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            createdAt: true,
            subscription: {
              select: {
                plan: { select: { name: true } },
                status: true
              }
            }
          },
          skip: (parseInt(page as string) - 1) * parseInt(limit as string),
          take: parseInt(limit as string),
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({ where })
      ]);

      res.json({
        users,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  getUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          subscription: {
            include: {
              plan: true,
              invoices: {
                take: 10,
                orderBy: { createdAt: 'desc' }
              }
            }
          },
          settings: true,
          auditLogs: {
            take: 20,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  updateUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { role, status } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { role, status },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true
        }
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  deleteUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() }
      });

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  banUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.user.update({
        where: { id },
        data: { status: 'BANNED' }
      });

      res.json({ message: 'User banned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to ban user' });
    }
  };

  unbanUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.user.update({
        where: { id },
        data: { status: 'ACTIVE' }
      });

      res.json({ message: 'User unbanned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to unban user' });
    }
  };

  createPlan = async (req: AuthRequest, res: Response) => {
    try {
      const planData = req.body;

      const plan = await prisma.plan.create({
        data: planData
      });

      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create plan' });
    }
  };

  updatePlan = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const planData = req.body;

      const plan = await prisma.plan.update({
        where: { id },
        data: planData
      });

      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update plan' });
    }
  };

  deletePlan = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.plan.update({
        where: { id },
        data: { isActive: false }
      });

      res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete plan' });
    }
  };

  createCoupon = async (req: AuthRequest, res: Response) => {
    try {
      const couponData = req.body;

      const coupon = await prisma.coupon.create({
        data: {
          ...couponData,
          code: couponData.code.toUpperCase()
        }
      });

      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create coupon' });
    }
  };

  getRevenue = async (req: AuthRequest, res: Response) => {
    try {
      const { period = '30' } = req.query;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period as string));

      const revenue = await prisma.invoice.groupBy({
        by: ['createdAt'],
        where: {
          status: 'PAID',
          createdAt: { gte: startDate }
        },
        _sum: { amount: true },
        orderBy: { createdAt: 'asc' }
      });

      const totalRevenue = revenue.reduce((sum: number, r: any) => sum + (Number(r._sum.amount) || 0), 0);

      res.json({
        revenue,
        totalRevenue,
        period: period
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch revenue data' });
    }
  };

  getApiUsage = async (req: AuthRequest, res: Response) => {
    try {
      const { period = '30' } = req.query;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period as string));

      const usage = await prisma.apiUsage.findMany({
        where: {
          periodStart: { gte: startDate }
        },
        orderBy: { periodStart: 'desc' }
      });

      const totalRequests = usage.reduce((sum: number, u: any) => sum + u.requestCount, 0);

      res.json({
        usage,
        totalRequests,
        period
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch API usage' });
    }
  };

  getLogs = async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 50, level, action } = req.query;

      const where: any = {};

      if (action) {
        where.action = action as string;
      }

      const logs = await prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { id: true, email: true, name: true }
          }
        },
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' }
      });

      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  };

  getErrors = async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 50 } = req.query;

      const errors = await prisma.auditLog.findMany({
        where: { success: false },
        include: {
          user: {
            select: { id: true, email: true, name: true }
          }
        },
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' }
      });

      res.json(errors);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch errors' });
    }
  };

  getQueues = async (req: AuthRequest, res: Response) => {
    try {
      const queues = await prisma.queueJob.groupBy({
        by: ['queueName', 'status'],
        _count: true
      });

      res.json(queues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch queue status' });
    }
  };

  createAnnouncement = async (req: AuthRequest, res: Response) => {
    try {
      const { title, message, type } = req.body;

      // This would create a system announcement
      // For now, just return success
      res.json({ message: 'Announcement created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create announcement' });
    }
  };

  getAnnouncements = async (req: AuthRequest, res: Response) => {
    try {
      // This would fetch system announcements
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch announcements' });
    }
  };
}

export { AdminController };
