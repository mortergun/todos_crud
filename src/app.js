import express from "express";
import cors from "cors";
import db from "./utils/database.js";
import Todo from "./models/todos.model.js";
import todosRouter from "./components/todos/todos.routes.js";
import "dotenv/config";

Todo;

const PORT = process.env.PORT ?? 8000;

db.authenticate()
  .then(() => console.log("Conexión correcta"))
  .catch((err) => console.error(err));

db.sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRouter);

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
