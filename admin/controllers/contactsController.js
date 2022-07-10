import { UsersDB } from '../../utils/databases.js';
import { filterContacts } from '../../utils/helpers.js';
import User from '../../models/User.js';

const fetchContact = async (req, res, next) => {
	const { filter } = req.query;

	const users = filter === 'true' ? filterContacts(UsersDB.Rows) : UsersDB.Rows;

	req.contacts = User.toUi(users);
	next();
};

const getAllContacts = (req, res) => {
	const admin = req.baseUrl.includes('admin');
	const { id } = req.query;
	const { contacts } = req;
	const headers = id ? User.ProfileHeaders : User.TableHeaders;
	if (admin) {
		res.status(200).json({ users: contacts, headers });
	} else {
		res.status(400).json({ message: 'Unauthorized, Admin only' });
	}
};

export { fetchContact, getAllContacts };
