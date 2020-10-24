const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = id => usersRepo.remove(id);

const save = user => {
  return usersRepo.save(user);
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
