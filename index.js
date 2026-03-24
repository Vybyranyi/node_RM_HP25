import express from "express";
import tasksRouter from './routes/tasksRoutes'

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту http://localhost:${PORT}`);
});
