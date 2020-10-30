const { Task } = require('./task.model');
const {
  // ValidationError,
  NotFoundError
} = require('../../common/errors/customErrors');

const getAll = async id => await Task.find({ boardId: id });

const save = async (boardId, tasks) => {
  // if (!task) {
  //   throw new ValidationError("Task data wasn't passed");
  // }
  tasks.boardId = boardId;
  const task = await Task.create(tasks);
  return task;
};

const get = async (id, boardId) => {
  // if (!id) {
  //   throw new ValidationError("Task id wasn't passed");
  // }
  const task = await Task.findOne({ _id: id, boardId });
  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  return task;
};

const update = async (body, id, boardId) => {
  // if (!id || !task) {
  //   throw new ValidationError(
  //     `Task ${id ? '' : 'id'} ${!id && !task ? 'and' : ''} ${
  //       task ? '' : 'data'
  //     } wasn't passed`
  //   );
  // }
  const task = await Task.findOne({ boardId, _id: id });
  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  await Task.findOneAndUpdate({ _id: id, boardId }, { ...body, boardId });
  return get(id, boardId);
};

const remove = async (id, boardId) => {
  // if (!id) {
  //   throw new ValidationError("Task id wasn't passed");
  // }
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
