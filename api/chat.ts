import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { config } from 'dotenv';

// Load environment variables from .env.local in development
if (process.env.VERCEL_ENV !== 'production') {
  config({ path: '.env.local' });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert education consultant specializing in tech education and bootcamps. Help users find the right educational path based on their goals, experience, and constraints. Be concise but informative."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: process.env.VERCEL_ENV === 'development' ? error.message : undefined
    });
  }
}
