import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log("Setting up test database...");
});

afterAll(async () => {
    await prisma.$disconnect();
    console.log("Test database cleaned up.");
});
  
