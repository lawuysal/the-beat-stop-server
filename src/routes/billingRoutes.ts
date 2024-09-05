import express from "express";

import billingController from "./../controllers/billingControllers";

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

export default router;
