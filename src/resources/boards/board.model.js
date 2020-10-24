// const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: String,
    columns: []
  },
  { collection: 'boards' }
);

// class Board {
//   constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

module.exports = Board;
