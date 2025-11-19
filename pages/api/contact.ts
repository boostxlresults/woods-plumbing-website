import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 5; // max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get IP address for rate limiting
    const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    const { name, email, phone, service, location, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Insert into database
    const [contact] = await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      service: service || null,
      location: location || null,
      message,
      ipAddress: ip,
    }).returning();

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you shortly.',
      contactId: contact.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'An error occurred. Please try again or call us directly.' 
    });
  }
}
