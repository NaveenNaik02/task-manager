import { Request, Response } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async-wrapper";

const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

export default createTask;
