import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from 'cors';
import 'dotenv/config'

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());


export { app };
