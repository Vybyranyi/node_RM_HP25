import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "tasks",
});

db.connect((error) => {
  if(error) {
    console.error("Помилка підключення до бази даних:", error);
  } else {
    console.log("Підключення до бази даних успішне!");
  }
});

export default db;