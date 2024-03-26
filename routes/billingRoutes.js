const express = require("express");
const fs = require("fs");

const billingController = require("./../controllers/billingControllers");

const router = express.Router();

router
  .route("/")
  .get(billingController.getAllBillings)
  .post(billingController.createBilling);

router
  .route("/:id")
  .get(billingController.getBilling)
  .patch(billingController.updateBilling)
  .delete(billingController.deleteBilling);

module.exports = router;
