import { AdminsDB, UsersDB } from '../../utils/databases.js';

const addAdmins = async (req, res) => {
	const { adminsToAdd } = req.body;

	if (!adminsToAdd || Array.from(adminsToAdd).length === 0) {
		res.status(400).json({ error: 'No admins to add' });
		return;
	}
	try {
		await Promise.all(
			Array.from(adminsToAdd).forEach(async (id) => {
				let query = `UPDATE SocialLogin.Users SET Admin=TRUE WHERE Id='${id}'`;
				await UsersDB.query(query);
				if (!AdminsDB.exists(id)) {
					query = `INSERT INTO SocialLogin.Admins (Id) VALUES ('${id}')`;
					await AdminsDB.query(query);
				}
			})
		);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
		return;
	}
};

export { addAdmins };
