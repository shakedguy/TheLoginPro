import express from 'express';
import authorizationMiddleware from '../../middlewares/authorization.js';

import { getProfilePage } from '../../controllers/profileController.js';

const profileAdminRoute = express.Router();

profileAdminRoute.use(authorizationMiddleware);

profileAdminRoute.route('/').get(getProfilePage);

export default profileAdminRoute;
