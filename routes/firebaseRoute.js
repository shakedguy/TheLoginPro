import express from 'express';
import { getFirebaseConfig } from '../controllers/firebaseController.js';

const firebaseRoute = express.Router();

firebaseRoute.route('/').get(getFirebaseConfig);

export default firebaseRoute;
