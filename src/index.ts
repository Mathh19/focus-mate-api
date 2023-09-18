import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './router';
import { connectToDB } from './database/connectToDb'

config();
const app = express();
app.use(cors({
  credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server running on port ${port}`));

connectToDB();

app.use('/', router());
