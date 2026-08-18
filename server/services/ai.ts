import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GenerateReplyParams {
  review: string;
  rating: number;
  tone: 'professional' | 'friendly' | 'funny' | 'sales' | 'seo';
  businessName: string;
}

interface GenerateContentParams {
  contentType: string;
  businessName: string;
  businessType: string;
  tone: string;
  additionalContext?: string;
}

class AIService {
  private openai: OpenAI | null = null;
  private anthropic: Anthropic | null = null;
  private gemini: GoogleGenerativeAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  }

  async generateAIReply(params: GenerateReplyParams): Promise<string> {
    const { review, rating, tone, businessName } = params;

    const toneInstructions = {
      professional: 'Write a professional, courteous response that addresses the customer\'s feedback.',
      friendly: 'Write a warm, friendly response that shows appreciation for the customer.',
      funny: 'Write a lighthearted, humorous response while still being respectful.',
      sales: 'Write a response that subtly promotes the business while addressing the feedback.',
      seo: 'Write a response that includes relevant keywords for SEO while addressing the feedback.'
    };

    const prompt = `You are responding to a Google Business Profile review for ${businessName}.

Review Rating: ${rating}/5
Review: "${review}"

Instructions: ${toneInstructions[tone]}

Generate a concise, helpful response (under 200 words):`;

    return this.generateText(prompt, 'openai');
  }

  async generateSEOContent(params: GenerateContentParams): Promise<string> {
    const { contentType, businessName, businessType, tone, additionalContext } = params;

    const prompts = {
      description: `Write a compelling business description for ${businessName}, a ${businessType}. ${additionalContext || ''}. Make it SEO-friendly and engaging.`,
      products: `Generate a list of products/services for ${businessName}, a ${businessType}. ${additionalContext || ''}.`,
      services: `Generate a list of services offered by ${businessName}, a ${businessType}. ${additionalContext || ''}.`,
      faq: `Generate a list of frequently asked questions and answers for ${businessName}, a ${businessType}. ${additionalContext || ''}.`,
      post: `Write a social media post for ${businessName}, a ${businessType}. ${additionalContext || ''}.`,
      keywords: `Generate a list of SEO keywords for ${businessName}, a ${businessType}. ${additionalContext || ''}.`,
      meta_description: `Write a meta description for ${businessName}, a ${businessType}. ${additionalContext || ''}. Keep it under 160 characters.`,
      location_page: `Write content for a location page for ${businessName}, a ${businessType}. ${additionalContext || ''}.`
    };

    const prompt = prompts[contentType as keyof typeof prompts] || prompts.description;

    return this.generateText(prompt, 'openai');
  }

  private async generateText(prompt: string, provider: 'openai' | 'anthropic' | 'gemini' = 'openai'): Promise<string> {
    try {
      if (provider === 'openai' && this.openai) {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500
        });
        return response.choices[0]?.message?.content || '';
      }

      if (provider === 'anthropic' && this.anthropic) {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-opus-20240229',
          max_tokens: 500,
          messages: [{ role: 'user', content: prompt }]
        });
        return response.content[0]?.type === 'text' ? response.content[0].text : '';
      }

      if (provider === 'gemini' && this.gemini) {
        const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
        const response = await model.generateContent(prompt);
        return response.response.text() || '';
      }

      throw new Error('No AI provider available');
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate content');
    }
  }

  async detectIntent(message: string): Promise<string> {
    const prompt = `Classify the intent of this message into one of: booking, inquiry, complaint, support, general. Message: "${message}"`;

    try {
      const intent = await this.generateText(prompt, 'openai');
      return intent.toLowerCase().trim();
    } catch (error) {
      return 'general';
    }
  }

  async generateConversationSummary(messages: Array<{ role: string; content: string }>): Promise<string> {
    const conversation = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `Summarize this conversation in 2-3 sentences:\n${conversation}`;

    return this.generateText(prompt, 'openai');
  }
}

export const aiService = new AIService();
export const generateAIReply = (params: GenerateReplyParams) => aiService.generateAIReply(params);
export const generateSEOContent = (params: GenerateContentParams) => aiService.generateSEOContent(params);
