const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('uuid');

const Task = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Too short task title'],
      maxlength: 30,
      required: [true, 'Type task title']
    },
    order: {
      type: Number,
      min: [0, "Order can't be negative"],
      required: [true, 'Type task order']
    },
    description: String,
    userId: String,
    boardId: {
      type: String,
      required: [true, 'Type task board ID']
    },
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { collection: 'tasks', versionKey: false }
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
