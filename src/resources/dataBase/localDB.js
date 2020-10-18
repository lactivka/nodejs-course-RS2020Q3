const User = require('../users/user.model');
const Task = require('../tasks/task.model');
const Board = require('../boards/board.model');

const dataBase = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      dataBase.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      dataBase.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (dataBase.Tasks[dataBase.Tasks.indexOf(task)] = undefined)
      );
    }
  },
  fixTasksStructure: () => {}
};

(() => {
  for (let i = 0; i < 3; i += 1) {
    dataBase.Users.push(new User());
  }
  const board = new Board();
  dataBase.Boards.push(board);
  dataBase.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
})();

const getAllEntities = tableName => {
  return dataBase[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = dataBase[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    console.error(
      `The data base is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
  }

  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    dataBase[`fix${tableName}Structure`](entity);
    const ind = dataBase[tableName].indexOf(entity);
    dataBase[tableName] = [
      ...dataBase[tableName].slice(0, ind),
      ...(dataBase[tableName].length > ind + 1
        ? dataBase[tableName].slice(ind + 1)
        : [])
    ];
  }

  return entity;
};

const saveEntity = (tableName, entity) => {
  dataBase[tableName].push(entity);

  return getEntity(tableName, entity.id);
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    dataBase[tableName][dataBase[tableName].indexOf(oldEntity)] = { ...entity };
  }
  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};
