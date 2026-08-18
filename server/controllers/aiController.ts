import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

export class AIController {
  generateContent = async (req: Request, res: Response) => {
    try {
      const { contentType, businessName, businessType, tone, additionalContext, prompt } = req.body;
      
      // MOCK: Return a simulated AI response to avoid 500 errors from missing API keys
      setTimeout(() => {
        const mockResponse = `[Mock AI Response for "${prompt || contentType}"]\n\nHere is a ready-to-publish social post: 'Smile brighter this season with our premium whitening offer. Book your appointment today and enjoy a free consultation.'`;
        res.json({ content: mockResponse });
      }, 1000); // 1-second delay to simulate AI generation
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate AI content' });
    }
  };
  
  getGeneratedContent = async (req: Request, res: Response) => {
    res.json({ data: [] });
  };

  getGeneratedContentById = async (req: Request, res: Response) => {
    res.json({ data: null });
  };

  updateAISettings = async (req: Request, res: Response) => {
    res.json({ success: true });
  };
}
