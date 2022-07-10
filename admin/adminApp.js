import express from 'express';
const adminApp = express();
import { getMenuItems } from '../controllers/menuController.js';
import { getLoginPage, login } from '../controllers/loginController.js';
import { logout } from '../controllers/logoutController.js';
import { getHomePage } from '../controllers/homeController.js';
import profileAdminRoute from './routes/profileAdminRoute.js';
import messagesRoute from './routes/messagesRoute.js';
import usersRoute from './routes/usersRoute.js';
import contactsRoute from './routes/contactsRoute.js';
import adminsRoute from './routes/adminsRoute.js';
const staticFolder = new URL('../static/', import.meta.url).pathname;

adminApp.get('/', getHomePage);
adminApp.get('/home', (req, res) => res.redirect('/admin'));
adminApp.route('/login').get(getLoginPage).post(login);
adminApp.route('/logout').get(logout);
adminApp.use('/profile', profileAdminRoute);
adminApp.get('/api/menu', getMenuItems);
adminApp.use('/messages', messagesRoute);
adminApp.use('/users', usersRoute);
adminApp.use('/api/users', contactsRoute);
adminApp.use('/api/admins', adminsRoute);

adminApp.use(express.static(staticFolder));

export default adminApp;
