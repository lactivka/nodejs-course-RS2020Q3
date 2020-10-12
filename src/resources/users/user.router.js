const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  // map user fields to exclude secret fields like "password"
  await res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await userService.get(req.params.id);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await userService.remove(req.params.id);
  res.sendStatus(200);
});

router.route('/').post(async (req, res) => {
  const user = await userService.save(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await userService.update(req.params.id, {
    id: req.body.id,
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  });

  res.status(200).send(User.toResponse(user));
});

module.exports = router;
