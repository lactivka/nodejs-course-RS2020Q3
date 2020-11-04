const router = require('express').Router();
const { toResponse } = require('./user.model');
const errorCatcher = require('../../common/errors/errorCatcher');
const userService = require('./user.service');
const { OK, NO_CONTENT } = require('http-status-codes');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    await res.status(OK).json(users.map(toResponse));
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const userEntity = await userService.getById(req.params.id);
    res.status(OK).send(toResponse(userEntity));
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const userEntity = await userService.save(req.body);
    res.status(OK).send(toResponse(userEntity));
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const userEntity = await userService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(userEntity));
  })
);

module.exports = router;
