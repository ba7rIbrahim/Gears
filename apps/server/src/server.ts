import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { connectDB } from "./config/database";
import dotenv from "dotenv";
import morgan from "morgan";
import productRouter from "./routes/product-route";
import orderRoute from "./routes/order-route";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Ensure correct protocol detection behind proxies/CDNs for secure cookies
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://geeaers.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route all Better Auth API requests (Express 5 compatible)
app.use("/api/auth", toNodeHandler(auth));
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/orders", orderRoute);

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on PORT:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
