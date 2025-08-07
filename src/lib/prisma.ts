// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Declare a global variable for PrismaClient to prevent multiple instances
// in development (due to Next.js hot reloading)
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Log database queries and other events
  });

// In development, store the PrismaClient instance on the global object
// so it's not re-instantiated on every hot reload.
if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
