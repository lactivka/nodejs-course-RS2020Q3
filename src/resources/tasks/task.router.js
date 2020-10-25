const router = require('express').Router({ mergeParams: true });
const { toResponse } = require('./task.model');
const taskService = require('./task.service');
const errorCatcher = require('../../common/errors/errorCatcher');
const { OK, NO_CONTENT } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.status(OK).json(tasks.map(toResponse));
});

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const task = await taskService.get(req.params.id, req.params.boardId);
    res.status(OK).json(toResponse(task));
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await taskService.remove(req.params.id, req.params.boardId);
    res.sendStatus(NO_CONTENT);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const task = await taskService.save(req.params.boardId, req.body);
    res.status(OK).json(toResponse(task));
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const task = await taskService.update(
      req.body,
      req.params.id,
      req.params.boardId
    );
    res.status(OK).json(toResponse(task));
  })
);

module.exports = router;
