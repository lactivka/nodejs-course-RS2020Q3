const express = require('express');
const morgan = require('morgan');
const winston = require('./common/winston');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(
  morgan(
    (tokens, req, res) => {
      console.log(req.params);
      return [
        tokens.method(req, res),
        tokens.status(req, res),
        tokens.url(req, res),
        'query:',
        JSON.stringify(req.params),
        'body:',
        JSON.stringify(req.body)
      ].join(' ');
    },

    { stream: winston.stream }
  )
);

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

module.exports = app;
