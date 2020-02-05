import Router from 'express';

import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import Validations from '../middlewares/ValidateResetPassword';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';

const router = Router();

router.post(
  '/auth/signup',
  passwordHasher,
  asyncErrorHandler(AuthController.signUp)
);
router.post(
  '/auth/reset-password',
  Validations.checkEmail,
  asyncErrorHandler(EmailController.sendResetPasswordEmail)
);
router.patch(
  '/auth/update-password/:userId/:token',
  Validations.checkPassword,
  userIdExistMiddleware,
  resetEmailTokenMiddleware,
  asyncErrorHandler(EmailController.updatePassword)
);

export default router;
