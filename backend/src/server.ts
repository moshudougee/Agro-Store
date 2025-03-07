import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes";
import fertilizerRoutes from "./routes/fertilizerRoutes";
import seedsRoutes from "./routes/seedsRoutes";
import detailsRoutes from "./routes/detailsRoutes";


dotenv.config();
const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: 'https://my-agro-store.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Verify database connection
prisma
  .$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/seeds", seedsRoutes);
app.use("/api/details", detailsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));