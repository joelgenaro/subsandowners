const AuthOwner = require("../models/mOwner.js");

exports.createOwnerWithEmail = (req, res) => {
  AuthOwner.exists({ email: req.body.email }).then((isEmail) => {
    if (isEmail) {
      res.status(404).json({
        message:
          "The email address you have provided is already in use. Please provide a different one or log in instead.",
      });
    } else {
      AuthOwner.create(req.body)
        .then((Owner) => {
          res.json({
            message: "Cheers!! You have successfully added Owner",
            Owner,
          });
        })
        .catch((err) => {
          res.status(404).json({
            message: "Sorry your Owner list cannot be added",
            error: err.message,
          });
        });
    }
  });
};

exports.updateOwner = (req, res) => {
  const filter = { email: req.body.email };
  const update = { ...req.body };

  AuthOwner.findOneAndUpdate(filter, update)
    .then((Owner) => {
      res.json({
        message: "Cheers!! You have successfully updated Owner",
        Owner,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your Owner list cannot be updated",
        error: err.message,
      });
    });
};
