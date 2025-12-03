// server.js
import express from "express";
import cors from "cors";

import { initDb } from "./db.js";
import eventsRouter from "./routes/eventsRoutes.js";
import clubsRouter from "./routes/clubsRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
}));

app.use(express.json());

// init DB at startup
initDb();

// route mounting
app.use("/api/events", eventsRouter);
app.use("/api/clubs", clubsRouter);
app.use("/api/auth", authRouter);

app.listen(5174, () => {
  console.log("Server running on port 5000");
});
