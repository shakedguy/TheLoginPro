import { Bigquery } from './firebaseService.js';
import { checkDatabase } from './helpers.js';
import catchAsync from './catchAsync.js';
import AppError from './AppError.js';
import User from '../models/User.js';

const Database = class {
	DB = Bigquery;
	table;
	#rows = [];
	constructor(table) {
		this.DB = Bigquery;
		this.#checkDatabase();
		this.Dataset = this.DB.dataset('SocialLogin');
		this.table = this.Dataset.table(table);
		this.table.getRows(this.getRowsCallback);
	}
	#checkDatabase = async () => await checkDatabase(this.DB);

	getRowsCallback = (err, rows) => {
		this.#rows = rows;
	};

	get Rows() {
		if (!this.IsUpdated) {
			this.table.getRows(this.getRowsCallback);
		}
		return this.#rows;
	}

	getAll = () => {
		if (!this.IsUpdated) {
			this.table.getRows(this.getRowsCallback);
		}
		return this.#rows;
	};

	get = async (id) => {
		if (!this.IsUpdated) {
			await this.updateRows();
		}
		return this.#rows.find((row) => row.Id === id);
	};

	query = catchAsync(async (query) => {
		const [rows] = await this.table.query(query);
		return rows;
	});

	updateRows = async () => {
		const [res] = await this.table.getRows();
		this.#rows = res;
	};

	exists = (id) => {
		if (!this.IsUpdated) {
			this.updateRows();
		}
		return this.Rows.some((row) => row.Id === id);
	};
	query = async (query) => {
		try {
			await this.table.query(query);
		} catch (err) {
			console.log(err);
		}
	};
};

const UsersDatabase = class extends Database {
	constructor() {
		super('Users');
	}
	insert = async (users) => {
		const usersToAdd = Array.from(users).map((user) => User.toBigQuery(user));

		try {
			const response = await this.table.insert(usersToAdd);
			await this.updateRows();
			return response;
		} catch (err) {
			console.log(err);
		}
	};
};

const AdminsDatabase = class extends Database {
	constructor() {
		super('Admins');
	}
	insert = async (ids) => {
		const idsToAdd = Array.from(ids).map((id) => ({ Id: id }));
		try {
			const response = await this.table.insert(idsToAdd);
			this.updateRows();
			return response;
		} catch (err) {
			console.log(err);
		}
	};
};

const MenuDatabase = class extends Database {
	constructor() {
		super('Menu');
	}
};

const AdminMenuDatabase = class extends Database {
	constructor() {
		super('AdminMenu');
	}
};

const UsersDB = new UsersDatabase();
const AdminsDB = new AdminsDatabase();
const MenuDB = new MenuDatabase();
const AdminMenuDB = new AdminMenuDatabase();

export { UsersDB, AdminsDB, MenuDB, AdminMenuDB };
