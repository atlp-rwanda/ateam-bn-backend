import Router from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import Validations from '../middlewares/ValidateResetPassword';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';
import { googleAuth, storeAuth } from '../controllers/socialController';
import { signUp, signIn } from '../middlewares/validation';
import importedTokenValidator from '../middlewares/tokenValidator';


const router = Router();
router.use(passport.initialize());
router.post(

  '/auth/signup', signUp,
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
  Validations.checkPasswordAnConfirmPassword,
  userIdExistMiddleware,
  resetEmailTokenMiddleware,
  asyncErrorHandler(EmailController.updatePassword)
);

router
  .post('/auth/signup', signUp, passwordHasher, asyncErrorHandler(AuthController.signUp))
  .post('/auth/reset-password', Validations.checkEmail, asyncErrorHandler(EmailController.sendResetPasswordEmail))
  .patch('/auth/update-password/:userId/:token', Validations.checkPassword, Validations.checkPasswordAnConfirmPassword, userIdExistMiddleware, resetEmailTokenMiddleware, asyncErrorHandler(EmailController.updatePassword))
  .put('/user/:email/confirm', AuthController.confirmation)
  .post('/auth/signin', signIn, asyncErrorHandler(AuthController.signIn))
  .get('/users/logout', importedTokenValidator, AuthController.logout);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }), googleAuth
);


router.get(
  '/auth/facebook',
  passport.authenticate('facebook')
);
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), storeAuth);

export default router;
