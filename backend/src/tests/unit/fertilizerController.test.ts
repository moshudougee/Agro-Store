import request from "supertest";
import app from "../../server";
import { PrismaClient } from "@prisma/client";
import '../setup';

const prisma = new PrismaClient();

describe("Fertilizer API", () => {
  let fertilizerId: string;

  it("should create a fertilizer", async () => {
    const res = await request(app).post("/api/fertilizers/create").send({
      name: "Organic Fertilizer",
      price: 49.99,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Fertilizer created");
    expect(res.body.fertilizer).toHaveProperty("name", "Organic Fertilizer");

    fertilizerId = res.body.fertilizer.id;
  });

  it("should fetch all fertilizers", async () => {
    const res = await request(app).get("/api/fertilizers/getFertilizers");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch a fertilizer by ID", async () => {
    const res = await request(app).get(`/api/fertilizers/getFertilizer/${fertilizerId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Organic Fertilizer");
  });

  it("should update a fertilizer", async () => {
    const res = await request(app).put(`/api/fertilizers/updateFertilizer/${fertilizerId}`).send({
      name: "Updated Fertilizer",
      price: 59.99,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Fertilizer updated");
    expect(res.body.fertilizer).toHaveProperty("name", "Updated Fertilizer");
  });

  it("should delete a fertilizer", async () => {
    const res = await request(app).delete(`/api/fertilizers/deleteFertilizer/${fertilizerId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Fertilizer deleted");
  });

});
