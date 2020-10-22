const router = require('express').Router();
const errorCatcher = require('../../common/errors/errorCatcher');
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    await res.json(users);
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const user = await userService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
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
    const user = await userService.save(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.status(200).send(User.toResponse(user));
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

    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
