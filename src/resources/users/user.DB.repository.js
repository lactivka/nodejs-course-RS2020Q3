const { User } = require('./user.model');

const {
  // ValidationError,
  NotFoundError
} = require('../../common/errors/customErrors');

const getAll = async () => User.find({});

const save = async user => {
  return User.create(user);
};

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => User.deleteOne({ _id: id });

module.exports = { getAll, save, get, remove, update };
