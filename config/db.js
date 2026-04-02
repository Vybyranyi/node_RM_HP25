import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if(error) {
    console.error("Помилка підключення до бази даних:", error);
  } else {
    console.log("Підключення до бази даних успішне!");
  }
});

export default db;