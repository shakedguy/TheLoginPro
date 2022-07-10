import express from 'express';
import { getErrorPage } from '../controllers/errorController.js';
const errorRoute = express.Router();

errorRoute.route('/').get(getErrorPage);

export default errorRoute;
