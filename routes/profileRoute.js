import express from 'express';
import { getProfilePage } from '../controllers/profileController.js';
import authorizationMiddleware from '../middlewares/authorization.js';
const profileRoute = express.Router();

profileRoute.use(authorizationMiddleware);

profileRoute.route('/').get(getProfilePage);

export default profileRoute;
