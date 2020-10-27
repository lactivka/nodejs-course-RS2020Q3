const mongoose = require('mongoose');
const { NotValidError } = require('../../common/errors/customErrors');

const checkID = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotValidError(`ID ${id} is not correct`);
  }
  return id;
};

module.exports = checkID;
