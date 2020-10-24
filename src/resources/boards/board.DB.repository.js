const {
  // ValidationError,
  NotFoundError
} = require('../../common/errors/customErrors');
const DB = require('../dataBase/localDB');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
};

const save = async board => {
  return DB.saveEntity(TABLE_NAME, board);
};

const update = async (id, board) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
