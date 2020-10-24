const router = require('express').Router();
const { toResponse } = require('./user.model');
const errorCatcher = require('../../common/errors/errorCatcher');
const userService = require('./user.service');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    await res.status(200).json(users.map(toResponse));
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const user = await userService.get(req.params.id);
    res.status(200).send(toResponse(user));
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const user = await userService.save(req.body);
    res.status(200).send(toResponse(user));
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const user = await userService.update(req.params.id, {
      id: req.params.id,
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    });

    res.status(200).send(toResponse(user));
  })
);

module.exports = router;
