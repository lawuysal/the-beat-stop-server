import fs from "fs";
import Beat, { BeatDocument } from "../models/beatModel";
import Purchase from "../models/purchaseModel";
import Track from "../models/trackModel";
import catchAsync from "./../utils/catchAsync";
import { Request, Response } from "express";
import mongoose from "mongoose";

async function getAllBeats(req: Request, res: Response) {
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

async function createBeat(req: Request, res: Response) {
  try {
    // Photo
    const newPhoto = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    ).photo[0];
    const photoPath = newPhoto.path;

    // Track
    const { originalname, path, mimetype } = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    ).fullTrack[0];
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
      parsedTypes = req.body.type.split(",").map((e: string) => e.trim());
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

async function getBeat(req: Request, res: Response) {
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

async function updateBeat(req: Request, res: Response) {
  try {
    res.status(200).json({
      status: "success",
      message: "updateBeat requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteBeat(req: Request, res: Response) {
  try {
    const beat: BeatDocument | null = await Beat.findByIdAndDelete(
      req.params.id
    );
    const tracks = beat?.tracks || [];
    const fullTrack = beat
      ? await Track.findByIdAndDelete(beat.fullTrack)
      : null;
    const photoPath = beat?.photo ?? "";
    const fullTrackPath = fullTrack?.path;
    fs.unlink(photoPath, () => console.log("Photo deleted!"));
    if (fullTrackPath) {
      fs.unlink(fullTrackPath, () => console.log("FullTrack deleted!"));
    }

    if (tracks.length !== 0) {
      for (let i = 0; i < tracks.length; i++) {
        const track = await Track.findByIdAndDelete(tracks[i]);
        const trackPath = track?.path;
        if (trackPath) {
          fs.unlink(trackPath, () => console.log("Track (i) deleted!"));
        }
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

const getUserBeats = async (req: Request, res: Response) => {
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

const getUserSoldBeats = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find({ seller: req.params.userId });
    const beatIds = purchases.map((e) => e.beat);
    const beats = await Beat.find({ _id: { $in: beatIds } });

    res.status(200).json({
      status: "success",
      data: {
        beats,
      },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", message: "Some error happened" + err });
  }
};

const getUserBoughtBeats = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find({ buyer: req.params.userId });
    const beatIds = purchases.map((e) => e.beat);
    const beats = await Beat.find({ _id: { $in: beatIds } });

    res.status(200).json({
      status: "success",
      data: {
        beats,
      },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", message: "Some error happened" + err });
  }
};

const addTrack = async (req: Request, res: Response) => {
  try {
    const { beatId, trackId } = req.params;

    const beat = await Beat.findById(beatId);
    if (!beat) {
      return res.status(404).json({
        status: "fail",
        message: "Beat not found",
      });
    }
    beat.tracks = [...beat.tracks, new mongoose.Schema.Types.ObjectId(trackId)];
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
    res.status(400).json({ status: "fail", message: err });
  }
};

const deleteTrack = async (req: Request, res: Response) => {
  try {
    const { beatId, trackId } = req.params;

    const newBeat = await Beat.findByIdAndUpdate(
      beatId,
      { $pull: { tracks: trackId } },
      {
        runValidators: true,
        new: true,
      }
    );

    const track = await Track.findByIdAndDelete(trackId);
    if (!track) {
      return res.status(404).json({
        status: "fail",
        message: "Track not found",
      });
    }
    const path = track.path;
    fs.unlink(path, () => {
      console.log("Track deleted successfully");
    });

    res.status(201).json({
      status: "success",
      message: "Track uploaded and saved successfully",
      data: {
        newBeat,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};

const editBeatMain = async (
  req: Request<{ beatId: string }, unknown, { type: string[] }>,
  res: Response
) => {
  try {
    const { beatId } = req.params;

    let parsedTypes: string[] = [];
    if (req.body.type) {
      parsedTypes = req.body.type.map((e) => e.trim());
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
    res.status(400).json({ status: "fail", message: err });
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

export default {
  getAllBeats,
  getBeat,
  createBeat,
  updateBeat,
  deleteBeat,
  getUserBeats,
  getUserSoldBeats,
  getUserBoughtBeats,
  addTrack,
  deleteTrack,
  editBeatMain,
  queryBeats,
};
