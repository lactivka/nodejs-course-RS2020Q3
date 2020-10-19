const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { getAllEntities } = require('../dataBase/localDB');
const { logInfo } = require('../../common/logger/winston');
const errorCatcher = require('../../common/errorCatcher');

router.route('/').get(async (req, res) => {
  console.log(req.originalUrl);
  const tasks = await taskService.getAll();
  await res.json(tasks);
  logInfo(req, res);
});

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const task = await taskService.get(req.params.id);
    await res.status(200).json(task);
    logInfo(req, res);
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await taskService.remove(req.params.id);
    res.sendStatus(200);
    logInfo(req, res);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const task = await taskService.save(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId
          ? req.body.boardId
          : getAllEntities('Boards')[getAllEntities('Boards').length - 1].id,
        columnId: req.body.columnId
      })
    );
    res.status(200).send(task);
    logInfo(req, res);
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const task = await taskService.update(req.params.id, {
      id: req.params.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    });

    res.status(200).send(task);
    logInfo(req, res);
  })
);

module.exports = router;
