import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authenticate';

// In-memory store for Phase 5 mock data
let mockLeads = [
  { id: '1', name: 'John Smith', business: 'Smith Plumbing', source: 'Website', stage: 'new_lead', value: 50000, assignee: 'System', date: new Date().toISOString() },
  { id: '2', name: 'Alice Johnson', business: 'Alice Bakery', source: 'WhatsApp', stage: 'contacted', value: 25000, assignee: 'System', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', name: 'Robert Fox', business: 'Fox Consulting', source: 'Referral', stage: 'won', value: 120000, assignee: 'System', date: new Date(Date.now() - 5 * 86400000).toISOString() }
];

let mockCustomers = [
  { id: '1', name: 'Rahul Mehta', business: 'Personal', email: 'rahul@email.com', phone: '+91 87654 32109', visits: 8, ltv: '₹24K', rating: 5, lastVisit: 'Jul 8' },
  { id: '2', name: 'Priya Sharma', business: 'Personal', email: 'priya@email.com', phone: '+91 98765 43210', visits: 12, ltv: '₹36K', rating: 5, lastVisit: 'Jul 10' },
  { id: '3', name: 'Kavita Desai', business: 'Personal', email: 'kavita@email.com', phone: '+91 76543 21098', visits: 5, ltv: '₹15K', rating: 4, lastVisit: 'Jul 1' },
  { id: '4', name: 'Anil Shah', business: 'Shah Corp', email: 'anil@shahcorp.in', phone: '+91 65432 10987', visits: 3, ltv: '₹9K', rating: 4, lastVisit: 'Jun 25' }
];

export class CRMController {
  // Leads
  getLeads = async (req: AuthRequest, res: Response) => {
    res.json(mockLeads);
  };

  getLead = async (req: AuthRequest, res: Response) => {
    const lead = mockLeads.find(l => l.id === req.params.id);
    if (lead) res.json(lead);
    else res.status(404).json({ error: 'Lead not found' });
  };

  createLead = async (req: AuthRequest, res: Response) => {
    const newLead = {
      id: `new-${Date.now()}`,
      ...req.body,
      date: new Date().toISOString(),
    };
    mockLeads.push(newLead);
    res.json(newLead);
  };

  updateLead = async (req: AuthRequest, res: Response) => {
    const idx = mockLeads.findIndex(l => l.id === req.params.id);
    if (idx !== -1) {
      mockLeads[idx] = { ...mockLeads[idx], ...req.body };
      res.json(mockLeads[idx]);
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  };

  deleteLead = async (req: AuthRequest, res: Response) => {
    mockLeads = mockLeads.filter(l => l.id !== req.params.id);
    res.json({ message: 'Deleted' });
  };

  updateLeadStage = async (req: AuthRequest, res: Response) => {
    const idx = mockLeads.findIndex(l => l.id === req.params.id);
    if (idx !== -1) {
      mockLeads[idx].stage = req.body.stage;
      res.json(mockLeads[idx]);
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  };

  getPipeline = async (req: AuthRequest, res: Response) => {
    // Return leads for pipeline view
    res.json(mockLeads);
  };

  // Customers
  getCustomers = async (req: AuthRequest, res: Response) => {
    res.json(mockCustomers);
  };

  // Dummy methods to satisfy the router interface for everything else
  getTasks = async (req: AuthRequest, res: Response) => { res.json([]); };
  getTask = async (req: AuthRequest, res: Response) => { res.json({}); };
  createTask = async (req: AuthRequest, res: Response) => { res.json({}); };
  updateTask = async (req: AuthRequest, res: Response) => { res.json({}); };
  deleteTask = async (req: AuthRequest, res: Response) => { res.json({}); };
  
  getNotes = async (req: AuthRequest, res: Response) => { res.json([]); };
  createNote = async (req: AuthRequest, res: Response) => { res.json({}); };
  updateNote = async (req: AuthRequest, res: Response) => { res.json({}); };
  deleteNote = async (req: AuthRequest, res: Response) => { res.json({}); };
  
  getActivities = async (req: AuthRequest, res: Response) => { res.json([]); };
}
