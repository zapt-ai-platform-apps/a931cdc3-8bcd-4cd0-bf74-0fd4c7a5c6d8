import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { properties } from '../drizzle/schema.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Error fetching property' });
  }
}