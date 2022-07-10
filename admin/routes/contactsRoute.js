import express from 'express';
import { getAllContacts, fetchContact } from '../controllers/contactsController.js';
import authorizationMiddleware from '../../middlewares/authorization.js';

const contactsRoute = express.Router();

contactsRoute.use(authorizationMiddleware);

contactsRoute.route('/').get(fetchContact, getAllContacts);

export default contactsRoute;
