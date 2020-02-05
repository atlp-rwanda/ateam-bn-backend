import Router from 'express';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import importedTokenValidator from '../middlewares/tokenValidator';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import signUp from '../middlewares/validation';

const router = Router();
router
  .post('/auth/signup', passwordHasher, asyncErrorHandler(AuthController.signUp))
  .put('/user/:email/confirm', AuthController.confirmation)
  .get('/users/logout', importedTokenValidator, AuthController.logout);

export default router;
