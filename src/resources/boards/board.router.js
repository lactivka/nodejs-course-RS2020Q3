const router = require('express').Router();
const errorCatcher = require('../../common/errors/errorCatcher');
const boardService = require('./board.service');
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./board.model');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const boards = await boardService.getAll();
    await res.status(OK).json(boards.map(toResponse));
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(OK).send(toResponse(board));
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const board = await boardService.save(req.body);
    res.status(OK).send(toResponse(board));
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(board));
  })
);

module.exports = router;
