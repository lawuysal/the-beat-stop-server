const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

async function getAllTracks(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllTracks requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createTrack(req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "createTrack requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getTrack(req, res) {
  try {
    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getTrack requested!",
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateTrack(req, res) {
  try {
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
    res.status(204).json({
      status: "success",
      message: "getTrack requested!",
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
