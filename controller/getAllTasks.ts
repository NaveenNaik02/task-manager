import { Request, Response } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async-wrapper";

const getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

export default getAllTasks;
