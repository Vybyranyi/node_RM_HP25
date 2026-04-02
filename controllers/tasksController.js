import fs from "fs";
const DB = "db.json";

import db from "../config/db.js";
import { randomBytes } from "crypto";

export const createTask = (req, res) => {
  const title = req.body.title;
  const timeNow = new Date();

  const sqlCommand =
    "INSERT INTO tasks_table (title, done, createdAt, updatedAt) VALUES (?, ?, ?, ?)";

  db.query(sqlCommand, [title, false, timeNow, timeNow], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при створенні завдання", error: error });

    res.json({
      message: "Завдання успішно створено",
      task: {
        id: results.insertId,
        title: title,
        done: false,
        createdAt: timeNow,
        updatedAt: timeNow,
      },
    });
  });
};

export const getAllTasks = (req, res) => {
  const done = req.query.done;

  let sqlCommand = "SELECT * FROM tasks_table";
  let params = [];

  if (done !== undefined) {
    sqlCommand = "SELECT * FROM tasks_table WHERE done = ?";
    params.push(done === "true" ? 1 : 0);
  }

  db.query(sqlCommand, params, (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при отриманні завдань", error: error });

    res.json(results);
  });
};

export const getTaskById = (req, res) => {
  const id = Number(req.params.id);

  const sqlCommand = "SELECT * FROM tasks_table WHERE id = ?";

  db.query(sqlCommand, [id], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при отриманні завдання", error: error });

    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "Завдання не знайдено" });
    
    res.json(results[0]);
  });
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id);

  const dbData = fs.readFileSync(DB, "utf8");
  const tasks = JSON.parse(dbData);

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Завдання не знайдено" });
  }

  tasks[taskIndex] = {
    id: id,
    title: req.body.title,
    done: req.body.done,
    createdAt: req.body.createdAt,
    updatedAt: req.requestTime,
  };

  fs.writeFileSync(DB, JSON.stringify(tasks));

  res.json({ message: "Завдання повністю оновлено" });
};

export const updateTaskStatus = (req, res) => {
  const id = parseInt(req.params.id);

  const dbData = fs.readFileSync(DB, "utf8");
  const tasks = JSON.parse(dbData);

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Завдання не знайдено" });
  }

  tasks[taskIndex].done = !tasks[taskIndex].done;

  fs.writeFileSync(DB, JSON.stringify(tasks));

  res.json({ message: "Статус оновлено" });
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  const dbData = fs.readFileSync(DB, "utf8");
  const tasks = JSON.parse(dbData);

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Завдання не знайдено" });
  }

  tasks.splice(taskIndex, 1);

  fs.writeFileSync(DB, JSON.stringify(tasks));

  res.json({ message: "завдання видалено" });
};
