import express from "express";
const app = express();
const router = express.Router();
import requesteRegistrationOTPRoute from "./requestRegistrationOTPRoute.js";
import registerRoute from "./registerRoute.js";

router.use("/request-registration-otp", requesteRegistrationOTPRoute);
router.use("/register", registerRoute);

export default router;
