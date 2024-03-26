const fs = require("fs");

async function getAllBillings(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllBillings requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createBilling(req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "createBilling requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getBilling(req, res) {
  try {
    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getBilling requested!",
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateBilling(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "updateBilling requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteBilling(req, res) {
  try {
    res.status(204).json({
      status: "success",
      message: "getBilling requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

module.exports = {
  getAllBillings,
  getBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};
