import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { properties } from '../drizzle/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const { type, name, location, price, description, imageUrl } = req.body;

    if (!type || !name || !location || !price || !description || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.insert(properties).values({ 
      type, 
      name, 
      location, 
      price: parseFloat(price),
      description,
      imageUrl,
      userId: user.id
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ error: 'Error saving property' });
  }
}