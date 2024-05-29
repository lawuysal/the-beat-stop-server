const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

async function getAllUsers(req, res) {
  try {
    // Build Query
    // 1A Filtering
    let queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((item) => delete queryObj[item]);

    // If a name is specified in the query, use it
    if (queryObj.name) {
      queryObj.username = new RegExp(queryObj.username, "i"); // 'i' makes it case insensitive
    }
    if (queryObj.email) {
      queryObj.email = new RegExp(queryObj.email, "i");
    }

    // 1B Advanced Filtering
    queryObj = JSON.stringify(queryObj).replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );

    let query = User.find(JSON.parse(queryObj));

    // 2 Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
      console.log(req.query.sort);
    } else {
      query = query.sort("-_id");
    }

    // 3 Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4 Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const num = await User.countDocuments();
      if (skip >= num) throw new Error("Page Not Found");
    }

    query = query.skip(skip).limit(limit);

    // Execute Query
    const users = await query;

    res.status(200).json({
      status: "success",
      results: users.length,
      message: "getAllUsers requested!",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
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
