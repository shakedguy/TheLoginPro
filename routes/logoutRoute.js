import express from 'express';
import { logout } from '../controllers/logoutController.js';
const logoutRoute = express.Router();

logoutRoute.route('/').get(logout);

export default logoutRoute;
