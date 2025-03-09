import request from "supertest";
import app from "../../server";
import { PrismaClient } from "@prisma/client";
import '../setup';

const prisma = new PrismaClient();

describe("Seeds API", () => {
  let seedId: string;
  let fertilizerId: string;

  beforeAll(async () => {
    // Create a test fertilizer to associate with seeds
    const fertilizer = await prisma.fertilizer.create({
      data: {
        name: "Test Fertilizer",
        price: 50.0,
      },
    });

    fertilizerId = fertilizer.id;
  });

  it("should create a seed", async () => {
    const res = await request(app).post("/api/seeds/create").send({
      name: "Test Seed",
      price: 100.0,
      fertilizerIds: [fertilizerId],
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Seeds created");
    expect(res.body.seeds).toHaveProperty("name", "Test Seed");

    seedId = res.body.seeds.id;
  }, 30000);

  it("should fetch all seeds", async () => {
    const res = await request(app).get("/api/seeds/getSeeds");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch a seed by ID", async () => {
    const res = await request(app).get(`/api/seeds/getSeed/${seedId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", seedId);
  });

  it("should update a seed", async () => {
    const res = await request(app).put(`/api/seeds/updateSeed/${seedId}`).send({
      name: "Updated Seed",
      price: 120.0,
      fertilizerIds: [fertilizerId],
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Seed updated");
    expect(res.body.seed).toHaveProperty("name", "Updated Seed");
  }, 20000);

  it("should delete a seed", async () => {
    const res = await request(app).delete(`/api/seeds/deleteSeed/${seedId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Seed deleted");
  });

  afterAll(async () => {
    await prisma.fertilizer.delete({where: {id: fertilizerId}});
  });
});
