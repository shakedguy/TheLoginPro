import express from 'express';
import { addAdmins } from '../controllers/adminsController.js';
import authorizationMiddleware from '../../middlewares/authorization.js';
const adminsRoute = express.Router();

adminsRoute.use(authorizationMiddleware);

adminsRoute.route('/').post(addAdmins);

export default adminsRoute;
