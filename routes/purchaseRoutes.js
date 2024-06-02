const express = require("express");
const fs = require("fs");

const purchaseController = require("./../controllers/purchaseControllers");

const router = express.Router();

router
  .route("/")
  .get(purchaseController.getAllPurchases)
  .post(purchaseController.createPurchase);

router
  .route("/:id")
  .get(purchaseController.getPurchase)
  .patch(purchaseController.updatePurchase)
  .delete(purchaseController.deletePurchase);

router.route("/is-buyer/:beatId/:userId").get(purchaseController.isBuyer);

module.exports = router;
