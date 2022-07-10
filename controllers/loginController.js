import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.js';
import { auth } from '../utils/firebaseService.js';
import AppSettings from '../utils/appsettings.js';
import AppError from '../utils/AppError.js';
import { AdminsDB, UsersDB } from '../utils/databases.js';

const getLoginPage = catchAsync(async (req, res) => {
	const { layout } = AppSettings;
	const loginPage = AppSettings.pages.login;
	const profilePage = AppSettings.pages.profile;
	const sessionCookie = req.cookies.idToken || null;

	const isLogedIn = sessionCookie ? true : false;
	const admin = req.baseUrl.includes('admin');
	if (isLogedIn) {
		const userData = await auth.verifySessionCookie(sessionCookie, true);
		const user = await UsersDB.get(userData.uid);
		req.userData = User.toUi(user);
		res.cookie('redirectFromLogin', true, { maxAge: 900000, httpOnly: true });
		let identifier;
		if (req.userData.Name) identifier = `username=${req.userData.Name.replaceAll(' ', '').toLowerCase()}`;
		else if (req.userData.Email) identifier = `email=${req.userData.Email}`;
		else if (req.userData.PhoneNumber) identifier = `phone=${req.userData.PhoneNumber}`;
		else identifier = `id=${req.userData.Id}`;
		const redirectUrl = admin ? `/admin/profile?${identifier}` : `/profile?${identifier}`;
		res.redirect(redirectUrl);
		return;
	}

	const content = isLogedIn ? profilePage : loginPage;
	const render = isLogedIn ? 'Profile' : 'Login';
	layout.menu.items = admin ? layout.menu.admin : layout.menu.default;

	res.render(render, {
		isLogedIn,
		isAlreadyLogedIn: isLogedIn,
		content,
		layout,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { idToken } = req.body;

	const decodedToken = await auth.verifyIdToken(idToken);
	if (!decodedToken) return next(new AppError('Failed to verify id token', 400));
	const userRecord = await auth.getUser(decodedToken.uid);
	if (!userRecord) return next(new AppError('Failed to fetch user data from firebase', 400));
	const user = User.fromFirebase(userRecord);
	if (!userRecord) return next(new AppError('Failed convert firebase user data to User Object', 400));
	const isAdmin = AdminsDB.exists(user.Id);
	const adminMode = req.baseUrl.includes('admin');

	if (adminMode && !isAdmin) {
		res.status(401).json({ status: 'unauthorized' });
	} else {
		if (adminMode && req.userData) {
			res.redirect('/admin/logout');
		}
		const expiresIn = process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 * 24 : Number(process.env.EXPIRES_COOKIE);
		const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
		if (!sessionCookie) return next(new AppError('Failed to create firebase session cookie', 400));
		const options = { maxAge: expiresIn, httpOnly: true, secure: true };
		res.cookie('idToken', sessionCookie, options);
		const exists = UsersDB.exists(user.Id);
		if (!exists) {
			await UsersDB.insert([user]);
		}
		res.status(200).json({ status: 'success' });
	}
});

const mobileLogin = catchAsync(async (req, res, next) => {
	const { idToken } = req.body;
	try {
		const token = await auth.verifyIdToken(idToken);
		const userCredentials = await auth.getUser(token.uid);
		const user = User.fromFirebase(userCredentials);
		res.status(201).send(JSON.stringify(user));
	} catch (error) {
		return next(new AppError('Unauthorized', 401));
	}
});

export { getLoginPage, login, mobileLogin };
