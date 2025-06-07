/**
 * 
 *   a simple utility file that ensures we are using 
 *   a singleton Prisma Client across the app. Without this,you 
 *   will create too many database connections
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma:PrismaClient | undefined;
};

export const prisma = 
globalForPrisma.prisma??
new PrismaClient({
    log:['query']
})

// if (process.env.NODE_ENV !== 'production') globalForPrisma=prisma;