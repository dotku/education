import type { VercelRequest, VercelResponse } from '@vercel/node';
import { config } from 'dotenv';

// Load environment variables from .env.local in development
if (process.env.VERCEL_ENV !== 'production') {
  config({ path: '.env.local' });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: {
      type: process.env.VERCEL_ENV || 'development',
      url: process.env.VERCEL_URL || 'localhost',
      node: process.version
    },
    openai: {
      isConfigured: !!process.env.OPENAI_API_KEY,
      model: "gpt-4-1106-preview"
    }
  });
}
