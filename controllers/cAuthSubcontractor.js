const AuthSubcontractor = require("../models/mSubcontractors.js");

exports.createSubcontractorWithEmail = (req, res) => {
  AuthSubcontractor.exists({ email: req.body.email }).then((isEmail) => {
    if (isEmail) {
      res.status(404).json({
        message:
          "The email address you have provided is already in use. Please provide a different one or log in instead.",
      });
    } else {
      AuthSubcontractor.create(req.body)
        .then((subcontractor) => {
          res.json({
            message: "Cheers!! You have successfully added subcontractor",
            subcontractor,
          });
        })
        .catch((err) => {
          res.status(404).json({
            message: "Sorry your subcontractor list cannot be added",
            error: err.message,
          });
        });
    }
  });
};

exports.updateSubcontractor = (req, res) => {
  const filter = { email: req.body.email };
  const update = { ...req.body };

  AuthSubcontractor.findOneAndUpdate(filter, update)
    .then((subcontractor) => {
      res.json({
        message: "Cheers!! You have successfully updated subcontractor",
        subcontractor,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your subcontractor list cannot be updated",
        error: err.message,
      });
    });
};
