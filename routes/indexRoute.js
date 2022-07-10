import express from 'express';
import { getHomePage } from '../controllers/homeController.js';

const indexRoute = express.Router();

indexRoute.route('/').get(getHomePage);

indexRoute.route('/home').get((req, res) => res.redirect('/'));

export default indexRoute;
