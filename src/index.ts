import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const main = async () => {
  config();
  const app = express();
  app.use(cors({
    credentials: true,
  }));
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Server running on port ${port}`));

  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URL);
  mongoose.connection.on('error', (error: Error) => console.log(`Error: ${error}`));
}

main();