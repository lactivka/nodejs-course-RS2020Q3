const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: String,
    columns: [],
    _id: {
      type: String,
      default: uuid
    }
  },
  { collection: 'boards' }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};

// class Board {
//   constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }
