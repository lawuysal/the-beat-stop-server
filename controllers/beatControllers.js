const fs = require("fs");
const Beat = require("../models/beatModel");
const Track = require("../models/trackModel");

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
    // Photo
    const newPhoto = req.files.photo[0];
    const photoPath = newPhoto.path;

    // Track
    const { originalname, path, mimetype } = req.files.fullTrack[0];
    let fileType = mimetype.split("/")[1];
    if (fileType === "mpeg") fileType = "mp3";
    const uploader = req.body.owner;

    const newTrack = new Track({
      uploader: uploader,
      name: originalname,
      path: path,
      fileType: fileType,
    });

    const newTrackObject = await newTrack.save();
    const newTrackId = newTrackObject._id.toString();

    const newBeat = {
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      type: req.body.type,
      license: req.body.license,
      owner: req.body.owner,
      bpm: req.body.bpm,
      key: req.body.key,
      photo: photoPath,
      fullTrack: newTrackId,
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
