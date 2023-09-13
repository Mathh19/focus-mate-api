import express from 'express';
import { config } from 'dotenv';
import { MongoClient } from './database/mongo';
import { MongoCreateTaskRepository } from './repositories/create-task/mongo-create-task';
import { CreateTaskController } from './controllers/create-task/create-task';

const main = async () => {
  config();
  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.post('/tasks', async (req, res) => {
    const mongoCreateTasksRepository = new MongoCreateTaskRepository();

    const createTaskController = new CreateTaskController(mongoCreateTasksRepository);

    const { body, statusCode } = await createTaskController.handle({ body: req.body });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Server on port ${port}`));
}

main();