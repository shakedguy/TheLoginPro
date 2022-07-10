import { MenuDB, AdminMenuDB } from '../utils/databases.js';

const getMenuItems = (req, res) => {
	const menu = req.baseUrl.includes('admin') && req.cookies.idToken ? AdminMenuDB.Rows : MenuDB.Rows;
	res.status(200).json(menu);
};

export { getMenuItems };
