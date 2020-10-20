const { ValidationError, NotFoundError } = require('../../common/customErrors');
const DB = require('../dataBase/localDB');
const TABLE_NAME = 'Tasks';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  if (!id) {
    throw new ValidationError("Task id wasn't passed");
  }
  const task = await DB.getEntity(TABLE_NAME, id);
  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  return task;
};

const remove = async id => {
  if (!id) {
    throw new ValidationError("Task id wasn't passed");
  }
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
};

const save = async task => {
  if (!task) {
    throw new ValidationError("Task data wasn't passed");
  }
  return DB.saveEntity(TABLE_NAME, task);
};

const update = async (id, task) => {
  if (!id || !task) {
    throw new ValidationError(
      `Task ${id ? '' : 'id'} ${!id && !task ? 'and' : ''} ${
        task ? '' : 'data'
      } wasn't passed`
    );
  }
  const entity = await DB.updateEntity(TABLE_NAME, id, task);
  if (!entity) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
