import express from 'express';
import { getSenderPage, prepareMessages, sendMessage } from '../controllers/messagesController.js';
import authorizationMiddleware from '../../middlewares/authorization.js';

const messagesRoute = express.Router();

messagesRoute.use(authorizationMiddleware);

messagesRoute.route('/').get(getSenderPage);
messagesRoute.route('/:via').post(prepareMessages, sendMessage);

// messagesRoute.route('/receive').all(receivingMessages);
export default messagesRoute;
