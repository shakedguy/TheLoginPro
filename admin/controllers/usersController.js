import AppSettings from '../../utils/appsettings.js';
import User from '../../models/User.js';
import { UsersDB } from '../../utils/databases.js';

const getAllUsers = async (req, res) => {
	const { users, user } = AppSettings.pages;
	const { layout } = AppSettings;

	const { id } = req.query;
	const { userData } = req;
	const admin = req.baseUrl.includes('admin');
	layout.menu.items = admin ? layout.menu.admin : layout.menu.default;
	if (admin) {
		const view = id ? 'User' : 'Users';

		const content = id ? user : users;
		const data = { isLogedIn: true, userData: userData, content, layout };
		if (id) {
			const response = await UsersDB.get(id);
			if (response) data.user = User.toUi(response);
		} else {
			data.users = User.toUi(UsersDB.Rows);
		}

		res.render(view, data);
	} else {
		res.render('error', {
			title: 'Error Page',
			message: 'Unauthorized, Admin only',
			isLogedIn: true,
			userData,
			content,
			layout,
		});
	}
};

const getUser = async (req, res) => {
	const { uid } = req.body;
	const { admin } = req;
	if (admin) {
		res.render('users', {
			users: users[uid],
			title: 'Users Page',

			isLogedIn: true,
			userData: req.userData,
			admin,
		});
	} else {
		res.render('error', {
			title: 'Error',
			userData: req.userData,
			message: 'Unauthorized, Admin only',
			admin,
		});
	}
};

export { getAllUsers, getUser };
