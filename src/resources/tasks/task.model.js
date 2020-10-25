const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('uuid');

const Task = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { collection: 'tasks' },
  { versionKey: false }
);

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'TASK',
//     order = 0,
//     description = 'TASK DESCRIPTION',
//     userId,
//     boardId,
//     columnId
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};
