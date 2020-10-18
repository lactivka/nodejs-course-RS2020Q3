const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.save(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.status(200).send(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(req.params.id, {
    id: req.params.id,
    title: req.body.title,
    columns: req.body.columns
  });

  res.status(200).send(board);
});

module.exports = router;
