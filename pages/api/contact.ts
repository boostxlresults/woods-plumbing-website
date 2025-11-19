import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { contacts, rateLimits } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

const RATE_LIMIT = 5; // max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

async function checkRateLimit(ip: string): Promise<boolean> {
  const now = new Date();
  const resetTime = new Date(now.getTime() + RATE_LIMIT_WINDOW);

  try {
    const existingLimit = await db.select().from(rateLimits).where(eq(rateLimits.ipAddress, ip)).limit(1);

    if (existingLimit.length === 0) {
      await db.insert(rateLimits).values({
        ipAddress: ip,
        requestCount: 1,
        resetTime: resetTime,
      });
      return true;
    }

    const record = existingLimit[0];
    
    if (now > new Date(record.resetTime)) {
      await db.update(rateLimits)
        .set({ requestCount: 1, resetTime: resetTime })
        .where(eq(rateLimits.ipAddress, ip));
      return true;
    }

    if (record.requestCount >= RATE_LIMIT) {
      return false;
    }

    await db.update(rateLimits)
      .set({ requestCount: sql`${rateLimits.requestCount} + 1` })
      .where(eq(rateLimits.ipAddress, ip));
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return true;
  }
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
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
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
