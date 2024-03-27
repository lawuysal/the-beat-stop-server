const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./../models/userModel");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      message: "getAllUsers requested!",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      message: "createUser requested!",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getUser requested!",
        data: {
          user,
        },
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "updateUser requested!",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);

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
