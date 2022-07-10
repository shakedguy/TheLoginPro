import '../utils/databases.js';
import catchAsync from '../utils/catchAsync.js';
import AppSettings from '../utils/appsettings.js';
import AppError from '../utils/AppError.js';
import { fetchUser } from '../utils/helpers.js';
const getHomePage = catchAsync(async (req, res, next) => {
	let userData = null;
	const sessionCookie = req.cookies.idToken || '';

	if (sessionCookie) {
		userData = await fetchUser(sessionCookie);
		if (!userData) return next(new AppError('Unauthorized', 401));
	}
	const isLogedIn = userData ? true : false;
	const { home } = AppSettings.pages;
	const { layout } = AppSettings;
	layout.menu.items = isLogedIn ? layout.menu.admin : layout.menu.default;

	res.render('Index', {
		content: home,
		layout,
		isLogedIn,
		userData,
	});
});

export { getHomePage };
