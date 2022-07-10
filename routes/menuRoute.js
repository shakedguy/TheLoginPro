import express from 'express';
const menuRoute = express.Router();
import { getMenuItems } from '../controllers/menuController.js';

menuRoute.route('/').get(getMenuItems);

export default menuRoute;
