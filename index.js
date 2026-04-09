import express from "express";
import tasksRouter from "./routes/tasksRoutes.js";
import { logger } from "./middlewares/logger.js";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(logger);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту http://localhost:${PORT}`);
});
