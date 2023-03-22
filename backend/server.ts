import express, { Application } from "express";
import cors from "cors";
import "./loadEnvironment";

import usersRouter from "./routes/users";
import exercisesRouter from "./routes/exercises";

import mongoose, { ConnectOptions } from "mongoose";

const CONNECTION_STRING = process.env.ATLAS_URI || "";
const EXPRESS_APP_PORT = process.env.PORT || 5000;
const API_URL = "/api";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use(`${API_URL}/users`, usersRouter);
app.use(`${API_URL}/exercises`, exercisesRouter);

mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(EXPRESS_APP_PORT, () => {
  console.log(`App is listening on ${EXPRESS_APP_PORT}`);
});

export default app;
