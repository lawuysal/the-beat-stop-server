import express from "express";
import uploadTrackMware from "./../middlewares/uploadTrackMware";
import trackController from "./../controllers/trackControllers";

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

export default router;
