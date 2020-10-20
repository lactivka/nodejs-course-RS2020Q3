const { ValidationError, NotFoundError } = require('../../common/customErrors');
const DB = require('../dataBase/localDB');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  if (!id) {
    throw new ValidationError("Board id wasn't passed");
  }
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const remove = async id => {
  if (!id) {
    throw new ValidationError("Board id wasn't passed");
  }
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
};

const save = async board => {
  if (!board) {
    throw new ValidationError("Board data wasn't passed");
  }
  return DB.saveEntity(TABLE_NAME, board);
};

const update = async (id, board) => {
  if (!id || !board) {
    throw new ValidationError(
      `Board ${id ? '' : 'id'} ${!id && !board ? 'and' : ''} ${
        board ? '' : 'data'
      } wasn't passed`
    );
  }
  const entity = await DB.updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
