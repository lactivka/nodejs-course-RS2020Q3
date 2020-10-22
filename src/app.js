const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./common/errors/errorHandler');
const { logError, logInfo } = require('./common/logger/winston');
const finish = require('./common/logger/winston').logger.finish;
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

app.use(logInfo);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

process.on('unhandledRejection', error => {
  logError(null, null, null, `Unhandled rejection detected: ${error.message}`);
  finish(1);
});

process.on('uncaughtException', error => {
  logError(null, null, null, `Captured uncaught exception: ${error.message}`);
  finish(1);
});

app.use(errorHandler);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
