const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Too short name'],
      maxlength: 30,
      required: [true, 'Type user name']
    },
    login: {
      type: String,
      minlength: [3, 'Too short login'],
      maxlength: 30,
      required: [true, 'Type user login']
    },
    password: {
      type: String,
      minlength: 5

      // in educational reasons the verification is simplified
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
    }
  },
  { collection: 'users', versionKey: false }
);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

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

module.exports = {
  User: mongoose.model('users', User),
  toResponse
};
