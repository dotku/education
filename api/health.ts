import type { VercelRequest, VercelResponse } from "@vercel/node";
import { config as dotenvConfig } from "dotenv";
import fs from "fs";

// Try multiple possible paths for .env.local
const envPaths = [
  ".env.local", // Current directory
  "../.env.local", // Parent directory
  ".env", // Fallback to .env in current directory
  "../.env", // Fallback to .env in parent directory
];

if (process.env.VERCEL_ENV !== "production") {
  // Try each path until we find one that exists
  for (const envPath of envPaths) {
    try {
      if (fs.existsSync(envPath)) {
        dotenvConfig({ path: envPath });
        console.log("Loaded env from:", envPath);
        break;
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to load env from:", envPath);
    }
  }
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: {
      type: process.env.VERCEL_ENV || "development",
      url: process.env.VERCEL_URL || "localhost",
      node: process.version,
    },
    openai: {
      isConfigured: !!process.env.OPENAI_API_KEY,
      model: "gpt-4-1106-preview",
    },
  });
}
