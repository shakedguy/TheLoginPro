import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { Firestore } from '../utils/firebaseService.js';
import { FirestoreStore } from '@google-cloud/connect-firestore';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

const globalMiddlewares = express();
globalMiddlewares.use(express.json());
globalMiddlewares.use(cookieParser());
globalMiddlewares.use(csurf({ cookie: true }));
globalMiddlewares.use(bodyParser.json());
globalMiddlewares.use(bodyParser.urlencoded({ extended: true }));
globalMiddlewares.use(cors({ origin: '*' }));
globalMiddlewares.use(helmet.crossOriginResourcePolicy());
globalMiddlewares.use(helmet.dnsPrefetchControl());
globalMiddlewares.use(helmet.expectCt());
globalMiddlewares.use(helmet.frameguard());
globalMiddlewares.use(helmet.hidePoweredBy());
globalMiddlewares.use(helmet.hsts());
globalMiddlewares.use(helmet.ieNoOpen());
globalMiddlewares.use(helmet.noSniff());
globalMiddlewares.use(helmet.originAgentCluster());
globalMiddlewares.use(helmet.permittedCrossDomainPolicies());
globalMiddlewares.use(helmet.referrerPolicy());
globalMiddlewares.use(helmet.xssFilter());

globalMiddlewares.set('trust proxy', 1);

globalMiddlewares.use(compression());

globalMiddlewares.use(
	session({
		genid: function (req) {
			return uuidv4(); // use UUIDs for session IDs
		},
		store: new FirestoreStore({
			dataset: Firestore,
			kind: 'express-sessions',
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

globalMiddlewares.all('*', (req, res, next) => {
	res.cookie('XSRF-TOKEN', req.csrfToken());
	next();
});

globalMiddlewares.use((req, res, next) => {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

export default globalMiddlewares;
