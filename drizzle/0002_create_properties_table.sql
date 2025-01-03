CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "price" NUMERIC NOT NULL,
  "description" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "user_id" UUID NOT NULL
);