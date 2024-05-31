const fs = require("fs");
const Beat = require("../models/beatModel");
const Track = require("../models/trackModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { APIFeatures } = require("./../utils/apiFeatures");

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

    let parsedTypes = [];
    if (req.body.type) {
      parsedTypes = req.body.type.split(",").map((e) => e.trim());
    }

    const newBeat = {
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      type: parsedTypes,
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
    const beat = await Beat.findById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "getBeat requested!",
      data: {
        beat,
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
    const beat = await Beat.findByIdAndDelete(req.params.id);
    const tracks = beat.tracks;
    const fullTrack = await Track.findByIdAndDelete(beat.fullTrack);
    const photoPath = beat.photo;
    const fullTrackPath = fullTrack.path;
    await fs.unlink(photoPath, () => console.log("Photo deleted!"));
    await fs.unlink(fullTrackPath, () => console.log("FullTrack deleted!"));

    if (tracks.length !== 0) {
      for (let i = 0; i < tracks.length; i++) {
        const track = await Track.findByIdAndDelete(tracks[i]);
        const trackPath = track.path;
        await fs.unlink(trackPath, () => console.log("Track (i) deleted!"));
      }
    }

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

const addTrack = async (req, res) => {
  try {
    const { beatId, trackId } = req.params;

    const beat = await Beat.findById(beatId);
    beat.tracks = [...beat.tracks, trackId];
    const newBeat = await Beat.findByIdAndUpdate(beatId, beat, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      status: "success",
      message: "Track uploaded and saved successfully",
      data: {
        newBeat,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const { beatId, trackId } = req.params;
    const beat = await Beat.findById(beatId);

    const newBeat = await Beat.findByIdAndUpdate(
      beatId,
      { $pull: { tracks: trackId } },
      {
        runValidators: true,
        new: true,
      }
    );
    console.log("Test 5");

    const track = await Track.findByIdAndDelete(trackId);
    console.log("Test 6");
    const path = track.path;
    console.log("Test 7");
    await fs.unlink(path, () => {
      console.log("Track deleted successfully");
    });
    console.log("Test 8");

    res.status(201).json({
      status: "success",
      message: "Track uploaded and saved successfully",
      data: {
        newBeat,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const editBeatMain = async (req, res) => {
  try {
    console.log("Test 1");
    const { beatId } = req.params;
    const beat = await Beat.findById(beatId);

    let parsedTypes = [];
    if (req.body.type) {
      parsedTypes = req.body.type.split(",").map((e) => e.trim());
    }
    req.body.type = parsedTypes;

    const updatedBeat = await Beat.findByIdAndUpdate(beatId, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      status: "success",
      message: "Beat updated successfully",
      data: {
        updatedBeat,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const queryBeats = catchAsync(async (req, res) => {
  const query = req.params.query;

  const beats = await Beat.find({ type: query });

  res.status(200).json({
    status: "success",
    results: beats.length,
    beats,
  });
});

module.exports = {
  getAllBeats,
  getBeat,
  createBeat,
  updateBeat,
  deleteBeat,
  getUserBeats,
  addTrack,
  deleteTrack,
  editBeatMain,
  queryBeats,
};
