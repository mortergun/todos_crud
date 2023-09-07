import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "./todos.controllers.js";

const router = Router();

router.get("/todos", getAllTasks);

router.get("/todos/:id", getTaskById);

router.post("/todos", createTask);

router.put("/todos/:id", updateTask);

router.delete("/todos/:id", deleteTask);

export default router;
