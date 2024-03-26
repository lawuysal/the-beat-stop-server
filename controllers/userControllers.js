const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

async function getAllUsers(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllUsers requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createUser(req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "createUser requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getUser(req, res) {
  try {
    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getUser requested!",
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateUser(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "updateUser requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteUser(req, res) {
  try {
    res.status(204).json({
      status: "success",
      message: "getUser requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
