const usersRepo = require('./user.DB.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const remove = id => usersRepo.remove(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, getById, remove, save, update };
