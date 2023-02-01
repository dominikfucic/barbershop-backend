import express from "express";
import {
  cancelAppointment,
  createAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentControllers";
const router = express.Router();

router.post("/new", createAppointment);
router.patch("/update/:id", updateAppointment);
router.delete("/cancel/:id", cancelAppointment);
router.get("/get/:userId", getAppointments);

export { router as appointmentsRouter };
