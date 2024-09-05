import { unlink } from "fs";
import Track, {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/trackModel";
import { Request, Response } from "express";

async function getAllTracks(req: Request, res: Response) {
  try {
    const tracks = await find();

    res.status(200).json({
      status: "success",
      message: "getAllTracks requested!",
      results: tracks.length,
      data: {
        tracks,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createTrack(req: Request, res: Response) {
  try {
    const { originalname, path, mimetype } = req.file;
    let fileType = mimetype.split("/")[1];
    if (fileType === "mpeg") fileType = "mp3";
    const uploader = req.body.uploader;

    const newTrack = new Track({
      uploader: uploader,
      name: originalname,
      path: path,
      fileType: fileType,
    });

    const track = await newTrack.save(); // Save to database

    res.status(201).json({
      status: "success",
      message: "Track uploaded successfully",
      data: {
        track,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getTrack(req: Request, res: Response) {
  try {
    const track = await findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getTrack requested!",
        data: {
          track,
        },
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateTrack(req: Request, res: Response) {
  try {
    const { originalname, path, mimetype } = req.file;
    let fileType = mimetype.split("/")[1];
    if (fileType === "mpeg") fileType = "mp3";
    const uploader = req.body.uploader;

    const newTrackObj = {
      name: originalname,
      path: path,
      fileType: fileType,
      uploader: uploader,
      uploadedAt: Date.now(),
    };

    const oldTrack = await findByIdAndUpdate(req.params.id, newTrackObj, {
      runValidators: true,
      new: false,
    });
    const oldPath = oldTrack.path;
    await unlink(oldPath, () => console.log("Old file deleted successfully"));

    res.status(200).json({
      status: "success",
      message: "updateTrack requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteTrack(req: Request, res: Response) {
  try {
    const track = await findByIdAndDelete(req.params.id);
    const path = track.path;
    await unlink(path, () => {
      console.log("File deleted successfully");
    });

    res.status(204).json({
      status: "success",
      message: "deleteTrack requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

const getUserTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await find({ uploader: { $eq: req.params.userId } });

    res.status(200).json({
      status: "success",
      data: {
        tracks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Can't found the tracks for this user." + err,
    });
  }
};

export default {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack,
  getUserTracks,
};
