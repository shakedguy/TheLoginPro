import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import app from './app.js';

const server = express();

if (process.env.NODE_ENV === 'development') {
	server.use(morgan('dev'));
}

const port = process.env.PORT || 3000;

server.use(app);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
