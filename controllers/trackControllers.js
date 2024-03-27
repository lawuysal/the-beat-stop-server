const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Track = require("./../models/trackModel");
const upload = require("./../middlewares/uploadMiddleware");

async function getAllTracks(req, res) {
  try {
    const tracks = await Track.find();

    res.status(200).json({
      status: "success",
      message: "getAllTracks requested!",
      results: tracks.length,
      data: {
        tracks,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
}

async function createTrack(req, res) {
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

    await newTrack.save(); // Save to database

    res.status(201).json({
      status: "success",
      message: "Track uploaded successfully",
      data: {
        newTrack,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}

async function getTrack(req, res) {
  try {
    const track = await Track.findById(req.params.id);

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

async function updateTrack(req, res) {
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

    const oldTrack = await Track.findByIdAndUpdate(req.params.id, newTrackObj, {
      runValidators: true,
      new: false,
    });
    const oldPath = oldTrack.path;
    await fs.unlink(oldPath, () =>
      console.log("Old file deleted successfully")
    );

    res.status(200).json({
      status: "success",
      message: "updateTrack requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteTrack(req, res) {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    const path = track.path;
    await fs.unlink(path, () => {
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

module.exports = {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack,
};
