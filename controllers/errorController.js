import AppSettings from '../utils/appsettings.js';

const getErrorPage = (req, res) => {
	const { userData } = req.session;
	const { error } = AppSettings.pages;
	const { layout } = AppSettings;
	const sessionCookie = req.cookies.idToken || null;
	const isLogedIn = sessionCookie ? true : false;

	res.render('Error', {
		content: error,
		layout,
		userData,
		isLogedIn,
	});
};

export { getErrorPage };
