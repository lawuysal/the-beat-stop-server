const express = require("express");
const uploadTrackMware = require("./../middlewares/uploadTrackMware");

const trackController = require("./../controllers/trackControllers");

const router = express.Router();

router
  .route("/")
  .get(trackController.getAllTracks)
  .post(uploadTrackMware, trackController.createTrack);

router
  .route("/:id")
  .get(trackController.getTrack)
  .patch(uploadTrackMware, trackController.updateTrack)
  .delete(trackController.deleteTrack);

router.route("/user/:userId").get(trackController.getUserTracks);

module.exports = router;
