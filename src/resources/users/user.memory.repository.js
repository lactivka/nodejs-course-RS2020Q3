const DB = require('../dataBase/localDB');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);
  if (!user) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (id, user) => {
  const entity = await DB.updateEntity(TABLE_NAME, id, user);
  if (!entity) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
