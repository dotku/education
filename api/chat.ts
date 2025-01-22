import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { config as dotenvConfig } from "dotenv";
import path from "path";
import fs from "fs";

// Try multiple possible paths for .env.local
const envPaths = [
  '.env.local',           // Current directory
  '../.env.local',        // Parent directory
  '.env',                 // Fallback to .env in current directory
  '../.env',             // Fallback to .env in parent directory
];

if (process.env.VERCEL_ENV !== "production") {
  // Try each path until we find one that exists
  for (const envPath of envPaths) {
    const absolutePath = path.resolve(__dirname, envPath);
    try {
      if (fs.existsSync(absolutePath)) {
        dotenvConfig({ path: absolutePath });
        console.log('Loaded env from:', absolutePath);
        break;
      }
    } catch (error) {
      console.log('Failed to load env from:', absolutePath);
    }
  }
}

console.log("process.env", process.env);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages must be an array" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return res.status(200).json({
      message: completion.choices[0].message,
    });
  } catch (error: unknown) {
    console.error("Error in chat API:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
