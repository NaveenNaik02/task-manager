import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).send("route does not found");
};

export default notFound;
