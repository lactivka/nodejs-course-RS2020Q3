const { Board } = require('./board.model');
const {
  // ValidationError,
  NotFoundError
} = require('../../common/errors/customErrors');
const taskService = require('../tasks/task.service');

const getAll = async () => await Board.find({});

const save = async board => await Board.create(board);

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
  await taskService.deleteBoardTasks(id);
  await Board.deleteOne({ _id: id });
  return board;
};

module.exports = { getAll, get, remove, save, update };
