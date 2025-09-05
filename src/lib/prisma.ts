import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.NODE_ENV === "production" ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl
    }
  }
});