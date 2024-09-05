import { Request, Response } from "express";

async function getAllBillings(req: Request, res: Response) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllBillings requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createBilling(req: Request, res: Response) {
  try {
    res.status(201).json({
      status: "success",
      message: "createBilling requested!",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getBilling(req: Request, res: Response) {
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

async function updateBilling(req: Request, res: Response) {
  try {
    res.status(200).json({
      status: "success",
      message: "updateBilling requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteBilling(req: Request, res: Response) {
  try {
    res.status(204).json({
      status: "success",
      message: "getBilling requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

export default {
  getAllBillings,
  getBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};
