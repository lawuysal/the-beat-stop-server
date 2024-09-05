import { Router } from "express";

import {
  getAllBeats,
  createBeat,
  getBeat,
  updateBeat,
  deleteBeat,
  getUserBeats,
  getUserSoldBeats,
  getUserBoughtBeats,
  addTrack,
  deleteTrack,
  editBeatMain,
  queryBeats,
} from "../../controllers/beatControllers";
import uploadBeatImageMware from "../middlewares/uploadBeatImageMware";

const router = Router();

router.route("/").get(getAllBeats).post(uploadBeatImageMware, createBeat);

router
  .route("/:id")
  .get(getBeat)
  .patch(uploadBeatImageMware, updateBeat)
  .delete(deleteBeat);

router.route("/user/:userId").get(getUserBeats);
router.route("/user/sold/:userId").get(getUserSoldBeats);
router.route("/user/bought/:userId").get(getUserBoughtBeats);

// for adding a new beat
router.route("/addTrack/:beatId/:trackId").patch(addTrack);

// for deleting a beat's individual track
router.route("/deleteTrack/:beatId/:trackId").patch(deleteTrack);

// for editing some fields of a beat
router.route("/editBeat/main/:beatId").patch(editBeatMain);

router.route("/query/:query").get(queryBeats);

export default router;
