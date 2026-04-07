import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  try {
    const title = req.body.title;

    const newTask = await prisma.task.create({
      data: {
        title: title,
      },
    });

    res.json({
      message: "Завдання успішно створено",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка при створенні завдання",
      error: error,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const done = req.query.done;
    let filter = {};

    if (done !== undefined) {
      filter = {
        where: {
          done: done === "true",
        },
      };
    }

    const tasks = await prisma.task.findMany(filter);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Помилка при отриманні завдань",
      error: error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const foundTask = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!foundTask) {
      return res.status(404).json({ message: "Завдання не знайдено" });
    }

    res.json(foundTask);
  } catch (error) {
    res.status(500).json({
      message: "Помилка при отриманні завдання",
      error: error,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const title = req.body.title;

    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { title: title },
    });

    res.json({
      message: "Завдання успішно оновлено",
      task: updatedTask,
    });
  } catch (error) {
    res.status(404).json({
      message: "Помилка при оновленні завдання",
      error: error,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return res.status(404).json({ message: "Завдання не знайдено" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { done: !task.done },
    });

    res.json({
      message: "Статус успішно оновлено",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка при оновленні статусу завдання",
      error: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deletedTask = await prisma.task.delete({
      where: { id: id },
    });

    res.json({
      message: "Завдання успішно видалено",
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка при видаленні завдання",
      error: error,
    });
  }
};
