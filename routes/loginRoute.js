import express from 'express';
const loginRoute = express.Router();
import { getLoginPage, login } from '../controllers/loginController.js';

loginRoute.route('/').get(getLoginPage).post(login);

export default loginRoute;
