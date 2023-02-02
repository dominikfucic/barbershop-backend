import express from "express";
import { getServices } from "../controllers/serviceControllers";

const router = express.Router();

router.get("/", getServices);

export { router as servicesRouter };
