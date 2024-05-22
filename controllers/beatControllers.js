const fs = require("fs");
const Beat = require("../models/beatModel");

async function getAllBeats(req, res) {
  try {
    const beats = await Beat.find();

    res.status(200).json({
      status: "success",
      length: beats.length,
      message: "getAllBeats requested!",
      data: {
        beats,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createBeat(req, res) {
  try {
    const newBeat = {
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      type: req.body.type,
      license: req.body.license,
      owner: req.body.owner,
      bpm: req.body.bpm,
      key: req.body.key,
    };

    const beat = await Beat.create(newBeat);

    res.status(201).json({
      status: "success",
      message: "createBeat requested!",
      data: {
        beat,
      },
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

const getUserBeats = async (req, res) => {
  try {
    const beats = await Beat.find({ owner: { $eq: req.params.userId } });

    res.status(200).json({
      status: "success",
      data: {
        beats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Can't found the beats for this user." + err,
    });
  }
};

module.exports = {
  getAllBeats,
  getBeat,
  createBeat,
  updateBeat,
  deleteBeat,
  getUserBeats,
};
