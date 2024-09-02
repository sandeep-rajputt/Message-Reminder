import express from "express";
const app = express();
const router = express.Router();
import requesteRegistrationOTPRoute from "./requestRegistrationOTPRoute.js";
import registerRoute from "./registerRoute.js";
import verifyRoute from "./verifyRoute.js";
import userData from "./userData.js";
import loginRoute from "./loginRoute.js";
import logoutRoute from "./logoutRoute.js";
import addReminder from "./addReminder.js";

router.use("/request-registration-otp", requesteRegistrationOTPRoute);
router.use("/register", registerRoute);
router.use("/verify", verifyRoute);
router.use("/userData", userData);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/addReminder", addReminder);

export default router;
