import express from "express";
import db from "./utils/database.js";
import Todo from "./models/todos.model.js";
import "dotenv/config"

Todo;

const PORT = process.env.PORT ?? 8000;

db.authenticate()
  .then(() => console.log("Conexión correcta"))
  .catch((err) => console.error(err))

db.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error(err))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("ok");
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.findByPk(id);
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { body } = req;
    const todos = await Todo.create(body);
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const todos = await Todo.update(body, {
      where: { id }
    });
    res.status(204).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: { id }
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});