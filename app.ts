import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import tasks from "./routes/tasks";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const db_url = process.env.connection_string!;

const app: Express = express();
const port = process.env.PORT || 3000;

//middleware for accessing req.body
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(db_url);
    app.listen(port, () => console.log(`server is listening on port ${port} `));
  } catch (err) {
    console.log(err);
  }
};

start();
