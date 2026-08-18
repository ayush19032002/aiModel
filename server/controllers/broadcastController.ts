import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticate';

export class BroadcastController {
  getBroadcasts = async (req: AuthRequest, res: Response) => {
    try {
      res.json([
        {
          id: 'bc-1',
          name: 'Summer Promo 2026',
          audience: 'all',
          templateId: 'promo_1',
          status: 'COMPLETED',
          sentAt: new Date(Date.now() - 86400000).toISOString(),
          recipientCount: 1245,
          deliveredCount: 1200,
          readCount: 850
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch broadcasts' });
    }
  };

  getBroadcast = async (req: AuthRequest, res: Response) => {
    res.json({ id: req.params.id, status: 'COMPLETED' });
  };

  createBroadcast = async (req: AuthRequest, res: Response) => {
    res.json({ id: `bc-new-${Date.now()}`, ...req.body, status: 'DRAFT' });
  };

  updateBroadcast = async (req: AuthRequest, res: Response) => {
    res.json({ id: req.params.id, ...req.body });
  };

  deleteBroadcast = async (req: AuthRequest, res: Response) => {
    res.json({ message: 'Broadcast deleted' });
  };

  sendBroadcast = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      res.json({ message: 'Broadcast sent successfully', id, status: 'SENDING' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send broadcast' });
    }
  };

  getBroadcastReport = async (req: AuthRequest, res: Response) => {
    res.json({ recipientCount: 1245, deliveredCount: 1200, readCount: 850 });
  };
}
