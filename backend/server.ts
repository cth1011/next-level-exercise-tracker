import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import templatesRouter from "./routes/templates";
import exercisesRouter from "./routes/exercises";

const EXPRESS_APP_PORT = process.env.PORT || 5000;
const API_URL = "/api";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use(`${API_URL}/templates`, templatesRouter);
app.use(`${API_URL}/exercises`, exercisesRouter);
// app.use(`${API_URL}/workouts`, workoutsRouter);

app.listen(EXPRESS_APP_PORT, () => {
  console.log(`App is listening on ${EXPRESS_APP_PORT}`);
});

export default app;
