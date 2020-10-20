const router = require('express').Router();
const errorCatcher = require('../../common/errorCatcher');
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const boards = await boardService.getAll();
    await res.json(boards);
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(204);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const board = await boardService.save(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );
    res.status(200).send(board);
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const board = await boardService.update(req.params.id, {
      id: req.params.id,
      title: req.body.title,
      columns: req.body.columns
    });

    res.status(200).send(board);
  })
);

module.exports = router;
