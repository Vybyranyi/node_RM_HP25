import fs from "fs";
const DB = "db.json";

export const createTask = (req, res) => {
  const title = req.body.title;

  const dbData = fs.readFileSync(DB, "utf8");
  const tasks = JSON.parse(dbData);

  const newTask = {
    id: Date.now(),
    title,
    done: false,
    createdAt: req.requestTime,
    updatedAt: req.requestTime,
  };

  tasks.push(newTask);

  fs.writeFileSync(DB, JSON.stringify(tasks));

  res.json({
    mesage: "Task created!",
    task: newTask,
  });
}

export const getAllTasks = (req, res) => {
  const dbData = fs.readFileSync(DB, "utf8");
  let tasks = JSON.parse(dbData);

  const done = req.query.done;

  if (done !== undefined) {
    const doneBool = done === "true";
    tasks = tasks.filter((t) => t.done === doneBool);
  }

  res.json(tasks);
}

export const getTaskById = (req, res) => {
  const id = req.params.id;

  const dbData = fs.readFileSync(DB, "utf8");
  const tasks = JSON.parse(dbData);

  const foundTask = tasks.find((t) => t.id === Number(id));

  if (!foundTask) {
    res.status(404).json({ message: "Task not found" });
  }

  res.json(foundTask);
}

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
}

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
}

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
}