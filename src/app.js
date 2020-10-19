/* eslint-disable no-process-exit */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./common/errorHandler');
const { logError } = require('./common/logger/winston');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('unhandledRejection', error => {
  logError(null, null, null, `Unhandled rejection detected: ${error.message}`);
  process.exit(1);
});

process.on('uncaughtException', error => {
  logError(null, null, null, `Captured uncaught exception: ${error.message}`);
  process.exit(1);
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));
module.exports = app;
