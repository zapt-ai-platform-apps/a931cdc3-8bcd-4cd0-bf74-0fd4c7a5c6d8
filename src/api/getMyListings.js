import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { properties } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.select()
      .from(properties)
      .where(eq(properties.userId, user.id))
      .limit(50);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Error fetching your listings' });
  }
}