import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from 'cors';
import 'dotenv/config'
import '../../containers'
import { errorMiddleware } from "./middlewares/error.middleware";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { routes } from "./routes";

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// app.use(morganMiddleware);

app.use(routes)

app.use(errorMiddleware);


export { app };
