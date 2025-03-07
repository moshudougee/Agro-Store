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
  origin: process.env.CLIENT_URL, 
  credentials: true,
};

app.use(cors(corsOptions));
//app.options("*", cors(corsOptions));
const allowCors = (req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); 
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond to preflight requests
  }

  next();
};

// Apply CORS middleware
app.use(allowCors);
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