const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const remove = (id, boardId) => tasksRepo.remove(id, boardId);

const save = (boardId, task) => {
  return tasksRepo.save(boardId, task);
};

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const deleteUserTasks = userId => tasksRepo.deleteUserTasks(userId);

const deleteBoardTasks = boardId => tasksRepo.deleteBoardTasks(boardId);

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
  deleteUserTasks,
  deleteBoardTasks
};
