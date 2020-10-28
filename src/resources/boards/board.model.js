const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Too short title'],
      maxlength: 30,
      required: [true, 'Type task title']
    },
    columns: {
      type: [
        {
          title: String,
          order: Number
        }
      ],
      required: [true, 'Type board columns list']
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { collection: 'boards', versionKey: false }
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
