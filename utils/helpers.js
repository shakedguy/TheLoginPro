import { auth } from './firebaseService.js';
import { UsersDB, AdminsDB } from './databases.js';
import User from '../models/User.js';

const checkDatabase = async (bigQuery) => {
	let dataset = bigQuery.dataset('SocialLogin');
	let [exists] = await dataset.exists();

	if (!exists) {
		[dataset] = await bigQuery.createDataset('SocialLogin', { location: 'US' });
	}
	const [tables] = await dataset.getTables();

	exists = tables.find((table) => table.id === 'Users');
	if (!exists) {
		const schema = User.schema();
		const options = {
			schema,
			location: 'US',
		};
		await dataset.createTable('Users', options);
	}
	exists = tables.find((table) => table.id === 'Admins');
	if (!exists) {
		const schema = [{ name: 'Id', type: 'STRING', mode: 'REQUIRED' }];
		const options = {
			schema,
			location: 'US',
		};
		await dataset.createTable('Admins', options);
	}
};

const fetchUser = async (idToken) => {
	const userData = await auth.verifySessionCookie(idToken, true);
	let user = await UsersDB.get(userData.uid);
	if (!user) {
		for (let i = 0; i < 3; i++) {
			setTimeout(async () => {
				user = await AdminsDB.get(userData.uid);
			}, i * 1000);
			if (user) break;
		}
	}
	return user;
};

const filterContacts = (contacts) => contacts.filter((contact) => contact.Email || contact.PhoneNumber);

const dateTimeUiFormat = 'DD/MM/YYYY HH:mm';
const dateTimeBigQueryFormat = 'YYYY-MM-DDTHH:mm:ss';

export { checkDatabase, filterContacts, fetchUser, dateTimeUiFormat, dateTimeBigQueryFormat };
