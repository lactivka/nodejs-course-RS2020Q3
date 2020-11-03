const { User } = require('./user.model');
const taskService = require('../tasks/task.service');
const checkID = require('../../common/validation/checkId');
const { NotFoundError } = require('../../common/errors/customErrors');
const { hashPassword } = require('../../common/hashHelper/hasher');

const getAll = async () => User.find({});

const save = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  return User.create(newUser);
};

const getById = async id => {
  await checkID(id);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const getByProps = async props => await User.find(props);

const saveAdminUser = async user => {
  const { name, login } = user;
  const users = await getByProps({ name, login });
  if (users.length < 1) await save(user);
};

const update = async (id, user) => {
  await checkID(id);
  await User.validate(user, ['name', 'login', 'password']);
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  await User.updateOne({ _id: id }, newUser);
  return getById(id);
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
module.exports = {
  getAll,
  save,
  getById,
  getByProps,
  remove,
  update,
  saveAdminUser
};
