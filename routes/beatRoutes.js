const express = require("express");
const fs = require("fs");

const beatController = require("./../controllers/beatControllers");

const router = express.Router();

router
  .route("/")
  .get(beatController.getAllBeats)
  .post(beatController.createBeat);

router
  .route("/:id")
  .get(beatController.getBeat)
  .patch(beatController.updateBeat)
  .delete(beatController.deleteBeat);

router.route("/user/:userId").get(beatController.getUserBeats);

module.exports = router;
