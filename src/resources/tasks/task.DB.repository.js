const { Task } = require('./task.model');
const {
  NotFoundError,
  NotValidError
} = require('../../common/errors/customErrors');
const validate = require('uuid-validate');

const getAll = async id => {
  if (!validate(id)) {
    throw new NotValidError(`Board ID ${id} is not correct`);
  }
  const tasks = await Task.find({ boardId: id });
  if (!tasks) {
    throw new NotFoundError(`Couldn't find tasks on board with id: ${id}`);
  }
  return tasks;
};

const save = async (boardId, tasks) => {
  if (!validate(boardId)) {
    throw new NotValidError(`Board ID ${boardId} is not correct`);
  }
  tasks.boardId = boardId;
  await Task.validate(tasks);
  const task = await Task.create(tasks);
  return task;
};

const get = async (id, boardId) => {
  if (!validate(boardId)) {
    throw new NotValidError(`Board ID ${boardId} is not correct`);
  }
  if (!validate(id)) {
    throw new NotValidError(`Task ID ${id} is not correct`);
  }

  const task = await Task.findOne({ _id: id, boardId });
  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  return task;
};

const update = async (body, id, boardId) => {
  if (!validate(boardId)) {
    throw new NotValidError(`Board ID ${boardId} is not correct`);
  }
  if (!validate(id)) {
    throw new NotValidError(`Task ID ${id} is not correct`);
  }
  await Task.validate(body);
  const task = await Task.findOne({ boardId, _id: id });
  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  await Task.findOneAndUpdate({ _id: id, boardId }, { ...body, boardId });
  return get(id, boardId);
};

const remove = async (id, boardId) => {
  if (!validate(boardId)) {
    throw new NotValidError(`Board ID ${boardId} is not correct`);
  }
  if (!validate(id)) {
    throw new NotValidError(`Task ID ${id} is not correct`);
  }

  const task = await Task.find({ boardId, _id: id });
  if (!task[0]) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  await Task.deleteOne({ _id: id, boardId });
  return task[0];
};

const deleteUserTasks = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};
const deleteBoardTasks = async boardId => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
  deleteUserTasks,
  deleteBoardTasks
};
