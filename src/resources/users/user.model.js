const mongoose = require('mongoose');
const { Schema } = mongoose;
// const uuid = require('uuid');

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collation: 'users' }
);

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }

module.exports = mongoose.model('users', User);
