const express = require("express");
const uploadMiddleware = require("./../middlewares/uploadMiddleware");

const trackController = require("./../controllers/trackControllers");

const router = express.Router();

router
  .route("/")
  .get(trackController.getAllTracks)
  .post(uploadMiddleware, trackController.createTrack);

router
  .route("/:id")
  .get(trackController.getTrack)
  .patch(uploadMiddleware, trackController.updateTrack)
  .delete(trackController.deleteTrack);

router.route("/user/:userId").get(trackController.getUserTracks);

module.exports = router;
