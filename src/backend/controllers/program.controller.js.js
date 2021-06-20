const db = require("../models");
const Program = db.programs;

// Create and save a new Program
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sourceCode) {
    res.status(400).send({ message: "Source code can not be empty!" });
    return;
  }

  // Create a Program
  const program = new Program({
    sourceCode: req.body.sourceCode,
  });

  // Save Program in the database
  program
    .save(program)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the program."
      });
    });
};

// Find a single Program with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Program.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found: Program with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Program with id " + id });
    });
};

// Update a Program by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot update program with empty data"
    });
  }

  const id = req.params.id;

  Program.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Program with id " + id
        });
      } else res.send({ message: "Program updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Program with id " + id
      });
    });
};
