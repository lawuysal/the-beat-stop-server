const express = require("express");

const trackController = require("./../controllers/trackControllers");

const router = express.Router();

router
  .route("/")
  .get(trackController.getAllTracks)
  .post(trackController.createTrack);

router
  .route("/:id")
  .get(trackController.getTrack)
  .patch(trackController.updateTrack)
  .delete(trackController.deleteTrack);

module.exports = router;
