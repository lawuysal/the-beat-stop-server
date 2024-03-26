const fs = require("fs");

async function getAllPurchases(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllPurchases requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createPurchase(req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "createPurchase requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getPurchase(req, res) {
  try {
    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getPurchase requested!",
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updatePurchase(req, res) {
  try {
    res.status(200).json({
      status: "success",
      message: "updatePurchase requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deletePurchase(req, res) {
  try {
    res.status(204).json({
      status: "success",
      message: "getPurchase requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

module.exports = {
  getAllPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
