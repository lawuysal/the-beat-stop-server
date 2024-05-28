const express = require("express");
const fs = require("fs");

const beatController = require("./../controllers/beatControllers");
const uploadBeatImageMware = require("./../middlewares/uploadBeatImageMware");

const router = express.Router();

router
  .route("/")
  .get(beatController.getAllBeats)
  .post(uploadBeatImageMware, beatController.createBeat);

router
  .route("/:id")
  .get(beatController.getBeat)
  .patch(uploadBeatImageMware, beatController.updateBeat)
  .delete(beatController.deleteBeat);

router.route("/user/:userId").get(beatController.getUserBeats);

// for adding a new beat
router.route("/addTrack/:beatId/:trackId").patch(beatController.addTrack);

// for deleting a beat's individual track
router.route("/deleteTrack/:beatId/:trackId").patch(beatController.deleteTrack);

// for editing some fields of a beat
router.route("/editBeat/main/:beatId").patch(beatController.editBeatMain);

module.exports = router;
