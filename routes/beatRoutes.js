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

module.exports = router;
