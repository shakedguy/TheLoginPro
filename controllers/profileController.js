import AppSettings from '../utils/appsettings.js';
import User from '../models/User.js';

const getProfilePage = (req, res) => {
	const { layout } = AppSettings;
	const { profile } = AppSettings.pages;
	const { userData } = req;
	const { redirectFromLogin } = req.cookies;
	res.clearCookie('redirectFromLogin');
	const admin = req.baseUrl.includes('admin');
	layout.menu.items = admin ? layout.menu.admin : layout.menu.default;
	const isLogedIn = userData ? true : false;
	res.render('Profile', {
		isLogedIn,
		userData: User.toUi(userData),
		isAlreadyLogedIn: redirectFromLogin,
		content: profile,
		layout,
	});
};

export { getProfilePage };
