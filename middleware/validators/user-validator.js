const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter valid email address").isEmail(),
  check("password", "Password field required more than 8 characters").isLength({
    min: 8,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.loginValidation = [
  check("email", "Please Enter a valid email").isEmail(),
  check("password", "Password field requires more than 8 character").isLength({
    min: 8,
  }),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
];
