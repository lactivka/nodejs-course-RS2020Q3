const usersRepo = require('./user.DB.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = id => usersRepo.remove(id);

const save = user => {
  return usersRepo.save(new User(user));
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
