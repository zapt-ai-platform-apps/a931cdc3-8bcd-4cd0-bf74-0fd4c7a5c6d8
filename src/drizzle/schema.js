import { pgTable, serial, text, timestamp, uuid, numeric } from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  price: numeric('price').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});