const { check, validationResult } = require("express-validator");

exports.validateCreateNote = [
  check("description", "Description is required field").not().isEmpty(),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
];
