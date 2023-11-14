import { NextFunction, Request, Response } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async-wrapper";
import { createCustomError } from "../errors/custom-error";

const getTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError(`No task with id:${taskID}`, 404));
    }
    res.status(200).json({ task });
  }
);

export default getTask;
