import fs from "fs";
const DB = "db.json";

import db from "../config/db.js";

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
      return res.status(404).json({ message: "Завдання не знайдено" });

    res.json(results[0]);
  });
};

export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const timeNow = new Date();

  const sqlCommand =
    "UPDATE tasks_table SET title = ?, updatedAt = ? WHERE id = ?";

  db.query(sqlCommand, [title, timeNow, id], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при редагуванні завдання", error: error });

    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Завдання не знайдено" });

    res.json({ message: "Завдання успішно оновлено" });
  });
};

export const updateTaskStatus = (req, res) => {
  const id = Number(req.params.id);
  const timeNow = new Date();

  const sqlCommand =
    "UPDATE tasks_table SET done = NOT done, updatedAt = ? WHERE id = ?";

  db.query(sqlCommand, [timeNow, id], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при зміні статусу завдання", error: error });

    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Завдання не знайдено" });

    res.json({ message: "Статус успішно оновлено" });
  });
};

export const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const sqlCommand = "DELETE FROM tasks_table WHERE id = ?";

  db.query(sqlCommand, [id], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Помилка при видаленні завдання", error: error });

    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Завдання не знайдено" });

    res.json({ message: "Завдання успішно видалено" });
  });
};
