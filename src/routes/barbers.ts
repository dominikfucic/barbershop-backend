import express from "express";
import { getBarbers, getFreeSlots} from "../controllers/barberControllers";

const router = express.Router();

router.get("/", getBarbers);
router.get("/get_time", getFreeSlots);

export { router as barbersRouter };
