const {
  ValidationError,
  NotFoundError
} = require('../../common/errors/customErrors');
const DB = require('../dataBase/localDB');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  if (!id) {
    throw new ValidationError("User id wasn't passed");
  }
  const user = await DB.getEntity(TABLE_NAME, id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  if (!id) {
    throw new ValidationError("User id wasn't passed");
  }
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
};

const save = async user => {
  if (!user) {
    throw new ValidationError("User data wasn't passed");
  }
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (id, user) => {
  if (!id || !user) {
    throw new ValidationError(
      `User ${id ? '' : 'id'} ${!id && !user ? 'and' : ''} ${
        user ? '' : 'data'
      } wasn't passed`
    );
  }
  const entity = await DB.updateEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
