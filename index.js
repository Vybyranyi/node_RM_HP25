import express from "express";
import tasksRouter from './routes/tasksRoutes.js'
import { logger } from "./middlewares/logger.js"
// import { checkAuth } from "./middlewares/checkAuth.js"

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(logger);
// app.use(checkAuth);
app.use("/tasks", tasksRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту http://localhost:${PORT}`);
});
