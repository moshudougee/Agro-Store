import request from "supertest";
import app from "../../server";
import '../setup'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Farmer Details API", () => {
  let userId: string;
  let detailsId: string;

  beforeAll(async () => {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: "testfarmer@example.com",
        password: "Test123!", 
        role: "FARMER",
      },
    });

    userId = user.id;
  });

  it("should add farmer details", async () => {
    const res = await request(app).post("/api/details/add").send({
      name: "John Doe",
      phone: "123456789",
      address: "123 Farm Lane",
      city: "Nairobi",
      userId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Details added");
    expect(res.body.details).toHaveProperty("name", "John Doe");

    detailsId = res.body.details.id; // Store detailsId for later tests
  }, 30000);

  it("should fetch farmer details by userId", async () => {
    const res = await request(app).get(`/api/details/getDetails/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "John Doe");
  });

  it("should fetch farmer details by detailsId", async () => {
    const res = await request(app).get(`/api/details/getDetailsById/${detailsId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "John Doe");
  });

  it("should update farmer details", async () => {
    const res = await request(app).put("/api/details/updateDetails").send({
      name: "John Updated",
      phone: "987654321",
      address: "456 New Lane",
      city: "Mombasa",
      userId,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Details updated");
    expect(res.body.updatedDetails).toHaveProperty("name", "John Updated");
  }, 20000);

  it("should delete farmer details", async () => {
    const res = await request(app).delete(`/api/details/deleteDetails/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Details deleted");
  });

  afterAll(async() => {
    await prisma.user.delete({where: { email: 'testfarmer@example.com'}});
  });
  
});
