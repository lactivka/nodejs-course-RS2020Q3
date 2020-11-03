const { logger, logError } = require('./common/logger/winston');
const userRepo = require('./resources/users/user.DB.repository');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const { DEFAULT_USER_ADMIN } = require('./common/constants');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () =>
  logError(null, null, null, 'MongoDB connection error:')
).once('open', () => {
  logger.info('Successfully connect to DB');
  // db.dropDatabase();
  userRepo.saveAdminUser(DEFAULT_USER_ADMIN);
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
