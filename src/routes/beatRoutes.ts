import { Router } from "express";

import BeatController from "../controllers/beatControllers";

import uploadBeatImageMware from "../middlewares/uploadBeatImageMware";

const router = Router();

router
  .route("/")
  .get(BeatController.getAllBeats)
  .post(uploadBeatImageMware, BeatController.createBeat);

router
  .route("/:id")
  .get(BeatController.getBeat)
  .patch(uploadBeatImageMware, BeatController.updateBeat)
  .delete(BeatController.deleteBeat);

router.route("/user/:userId").get(BeatController.getUserBeats);
router.route("/user/sold/:userId").get(BeatController.getUserSoldBeats);
router.route("/user/bought/:userId").get(BeatController.getUserBoughtBeats);

// for adding a new beat
router.route("/addTrack/:beatId/:trackId").patch(BeatController.addTrack);

// for deleting a beat's individual track
router.route("/deleteTrack/:beatId/:trackId").patch(BeatController.deleteTrack);

// for editing some fields of a beat
router.route("/editBeat/main/:beatId").patch(BeatController.editBeatMain);

router.route("/query/:query").get(BeatController.queryBeats);

export default router;
