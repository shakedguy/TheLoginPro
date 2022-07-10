'use strict';
import express from 'express';
import * as React from 'express-react-views';
import path, { dirname } from 'path';
import serveFavicon from 'serve-favicon';
import globalMiddlewares from './middlewares/global.js';
import { fileURLToPath, URL } from 'url';
import indexRoute from './routes/indexRoute.js';
import firebaseRoute from './routes/firebaseRoute.js';
import loginRoute from './routes/loginRoute.js';
import logoutRoute from './routes/logoutRoute.js';
import profileRoute from './routes/profileRoute.js';
import errorRoute from './routes/errorRoute.js';
import adminApp from './admin/adminApp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolder = new URL('./static/', import.meta.url).pathname;

const app = express();

app.use(globalMiddlewares);

app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', React.createEngine(options));
app.set('views', './views');
app.use(express.static(staticFolder));
app.use(serveFavicon(path.join(__dirname, 'static', 'assets', 'favicon.ico')));

app.use('/', indexRoute);
app.use('/admin', adminApp);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/api/firebase', firebaseRoute);
// app.use('/api/menu', menuRoute);

app.use('*', errorRoute);

export default app;
