import request from "supertest";
import app from "../../server"; 
import '../setup'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


describe("Authentication API", () => {

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "Test123!",
      role: "FARMER",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  }, 30000);

  it("should login a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Test123!",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("rest");
    expect(res.body.rest).toHaveProperty("email", "test@example.com");
  });

  afterAll(async() => {
    await prisma.user.delete({where: { email: 'test@example.com'}});
  });
});


