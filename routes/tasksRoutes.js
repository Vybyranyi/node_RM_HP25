import express from "express"
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "../controllers/tasksController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router