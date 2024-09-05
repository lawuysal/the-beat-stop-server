import Purchase from "../models/purchaseModel";
import Beat from "../models/beatModel";
import { Request, Response } from "express";

async function getAllPurchases(req: Request, res: Response) {
  try {
    res.status(200).json({
      status: "success",
      message: "getAllPurchases requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createPurchase(req: Request, res: Response) {
  try {
    const { seller, buyer, beatId } = req.body;
    console.log(req.body);

    const beat = await Beat.findById(beatId);

    if (!beat) {
      res.status(404).json({
        status: "fail",
        message: "Beat not found.",
      });
      return;
    }

    const { paid, license } = beat;

    if (seller === buyer) {
      res.status(400).json({
        status: "fail",
        message: "Seller and buyer can't be the same.",
      });
      return;
    }

    if (paid) {
      res.status(400).json({
        status: "fail",
        message:
          "This beat cannot be purchased, it's already purchased by someone else.",
      });
      return;
    }

    Purchase.create({ seller, buyer, beat, license });
    await Beat.findByIdAndUpdate(beatId, { paid: true });

    res.status(201).json({
      status: "success",
      message: "Beat purchased!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "An error happened while purchasing." + err,
    });
  }
}

async function getPurchase(req: Request, res: Response) {
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

async function updatePurchase(req: Request, res: Response) {
  try {
    res.status(200).json({
      status: "success",
      message: "updatePurchase requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deletePurchase(req: Request, res: Response) {
  try {
    res.status(204).json({
      status: "success",
      message: "getPurchase requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

const isBuyer = async (req: Request, res: Response) => {
  try {
    const { beatId, userId } = req.params;

    const purchase = await Beat.findOne({ beat: beatId, buyer: userId });

    res.status(200).json({
      status: "success",
      isBuyer: !!purchase,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

export default {
  getAllPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  isBuyer,
};
