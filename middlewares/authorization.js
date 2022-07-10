import { auth } from '../utils/firebaseService.js';
import User from '../models/User.js';
import { UsersDB, AdminsDB } from '../utils/databases.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
const authorizationMiddleware = catchAsync(async (req, res, next) => {
	const sessionCookie = req.cookies.idToken || '';
	if (!sessionCookie) return next(new AppError('Unauthorized', 401));

	const userData = await auth.verifySessionCookie(sessionCookie, true);
	if (!userData) return next(new AppError('Could not find user data', 400));

	let user = await UsersDB.get(userData.uid);

	if (!user) {
		for (let i = 0; i < 3; i++) {
			setTimeout(async () => {
				user = await AdminsDB.get(userData.uid);
			}, i * 1000);
			if (user) break;
		}
	}
	if (!user) return next(new AppError('User do not exist in Bigquery database', 400));

	req.userData = user;
	next();
});

export default authorizationMiddleware;
