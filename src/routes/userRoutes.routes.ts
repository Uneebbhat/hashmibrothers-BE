import UserSignupSchema from "../schemas/UserSignupSchema.schema";

import { Router } from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "../controllers/userController.controller";
import { validateBody } from "../helpers/validateBody";
import UserLoginSchema from "../schemas/UserLoginSchema.schema";
// import authentication from "../middlewares/authentication.middleware";
// import authorization from "../middlewares/authorization.middleware";

const router = Router();

router
  .post("/v1/signup", validateBody(UserSignupSchema), signup)
  .post("/v1/login", validateBody(UserLoginSchema), login)
  .post("/v1/forgot-password", forgotPassword)
  .post("/v1/reset-password/:token", resetPassword);

// Authentication routes examples
// router.post("/v1/signup", authentication,signup)
// router.post("/v1/signup", authorization(['admin', 'user']),signup)

export default router;
