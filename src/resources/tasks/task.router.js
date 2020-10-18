const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { getAllEntities } = require('../dataBase/localDB');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  await res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.get(req.params.id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('cannot find task');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
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
});

router.route('/:id').put(async (req, res) => {
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
});

module.exports = router;
