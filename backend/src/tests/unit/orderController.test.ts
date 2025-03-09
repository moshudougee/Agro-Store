import request from "supertest";
import app from "../../server";
import { PrismaClient } from "@prisma/client";
import '../setup'

const prisma = new PrismaClient();

describe("Order API", () => {
  let orderId: string;
  let userId: string;

  beforeAll(async () => {
    // Create a test user to associate orders with
    const user = await prisma.user.create({
      data: {
        email: "testuser@example.com",
        password: "hashedpassword",
        role: "FARMER",
      },
    });

    userId = user.id;
  });

  it("should place an order", async () => {
    const orderUnits = [{landSize: 5, seedsAmt: 200, fettilizerAmt: 3500,}]
    const res = await request(app).post("/api/orders/create").send({
      orderUnits,
      totalAmt: 100.0,
      paid: true,
      userId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Order placed");
    expect(res.body.order).toHaveProperty("totalAmt", 100.0);

    orderId = res.body.order.id;
  }, 30000);

  it("should fetch all orders", async () => {
    const res = await request(app).get("/api/orders/getAllOrders");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch an order by ID", async () => {
    const res = await request(app).get(`/api/orders/getOrder/${orderId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", orderId);
  });

  it("should fetch orders for a specific user", async () => {
    const res = await request(app).get(`/api/orders/getMyOrders/${userId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("farmerId", userId);
  });

  it("should update an order", async () => {
    const res = await request(app).put(`/api/orders/updateOrder/${orderId}`).send({
      totalAmt: 120.0,
      paid: false,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Order updated");
    expect(res.body.updatedOrder).toHaveProperty("totalAmt", 120.0);
  }, 20000);

  it("should delete an order", async () => {
    const res = await request(app).delete(`/api/orders/deleteOrder/${orderId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Order deleted");
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { email: 'testuser@example.com' } });
  });
});
