import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async-wrapper";
import { createCustomError } from "../errors/custom-error";
const updateTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate(
      {
        _id: taskID,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return next(createCustomError(`No task with id:${taskID}`, 404));
    }
    res.status(201).json(task);
  }
);

export default updateTask;
