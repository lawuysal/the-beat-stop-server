const fs = require("fs");

async function getAllBeats(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllBeats requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createBeat(req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "createBeat requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getBeat(req, res) {
  try {
    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getBeat requested!",
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateBeat(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "updateBeat requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteBeat(req, res) {
  try {
    res.status(204).json({
      status: "success",
      message: "getBeat requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

module.exports = {
  getAllBeats,
  getBeat,
  createBeat,
  updateBeat,
  deleteBeat,
};
