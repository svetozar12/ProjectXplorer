import express from 'express';
import { dbConnect } from './config';
import { initRoutes } from './api/routes';
import { handleZodError } from './utils/handleZodError';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// config init
dbConnect()
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((e) => {
    console.log('MongoDB failed to start');
    console.log(e);
  });
initRoutes();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use((err, req, res, _) => {
  const validationError = handleZodError(err);
  if (validationError) return validationError;
  console.error(err); // Log the error
  res.status(500).send('Internal Server Error');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
