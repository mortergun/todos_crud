import Todo from "../../models/todos.model.js";

const getAllTasks = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.findByPk(id);
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { body } = req;
    const todos = await Todo.create(body);
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const todos = await Todo.update(body, {
      where: { id },
    });
    res.status(204).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
