const { User } = require('./user.model');
const taskService = require('../tasks/task.service');
const checkID = require('../../common/validation/checkId');
const { NotFoundError } = require('../../common/errors/customErrors');

const getAll = async () => User.find({});

const save = async user => User.create(user);

const get = async id => {
  await checkID(id);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const update = async (id, user) => {
  await checkID(id);
  await User.validate(user, ['name', 'login', 'password']);
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  await checkID(id);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  const handledTasks = await taskService.deleteUserTasks(id);
  const deletedUser = await User.deleteOne({ _id: id });
  return { handledTasks, deletedUser };
};
module.exports = { getAll, save, get, remove, update };
