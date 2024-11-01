import 'dotenv/config';
import { config } from "./config/config";
import { Application } from "express";
import connectDB from "./config/mongoDB";
import express from "express";
import route from "./routes/routes";
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import logger from 'morgan';
import { limiter } from './utils/rateLimitter';


const port = Number(config.PORT)

// const app=new App()

// app.startServer(port)
const app: Application = express();
const server: http.Server = http.createServer(app);

const corsOptions = {
    origin: config.NODE_ENV === 'PROD' ? config.CORS_URL_1 : config.CORS_URL_2,
    credentials: true
};

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use('/api/v1/', route);
app.use(limiter);

app.use((req, res, next) => {
    res.status(500).send('Something broke!');
});

connectDB();

server.listen(port, () => {
    console.log(`server is running  http://localhost:${port}`);
});