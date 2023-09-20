import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './router';
import { connectToDB } from './database/connectToDb'

config();
const app = express();
app.use(cors({
  credentials: true,
}));

app.use(express.json());


const port = process.env.PORT || 8000;

app.use(router());

connectToDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
