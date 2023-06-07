import { Router } from "express";
import { GoogleAuthCtrl } from "../controllers/GoogleAuthController";

const router = Router();

router.get("/google", GoogleAuthCtrl.redirectToGoogle);
router.get("/google/callback", GoogleAuthCtrl.handleGoogleCallback);

export default router;
