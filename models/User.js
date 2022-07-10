import dayjs from 'dayjs';
import admin from 'firebase-admin';
import { AdminsDB } from '../utils/databases.js';
import { dateTimeUiFormat, dateTimeBigQueryFormat } from '../utils/helpers.js';
const db = admin.database();
const ref = db.ref('/');
let admins = [];

// ref.on('value', (snapshot) => {
// 	admins = snapshot.val().Admins;
// });

const User = class {
	Id = '1';
	Name = null;
	Email = null;
	EmailVerified = false;
	PhoneNumber = null;
	PhotoURL = null;
	Provider = null;
	CreationTime = null;
	LastLogin = null;
	LastRefreshTime = null;
	Admin = false;
	Disabled = true;
	PasswordHash = null;
	PasswordSalt = null;
	TokensValidAfterTime = null;
	static __requireProps = ['Id'];
	static __boolProps = ['EmailVerified', 'Admin', 'Disabled'];
	static __datetimeProps = ['CreationTime', 'LastLogin', 'LastRefreshTime', 'TokensValidAfterTime'];
	constructor(
		id = '1',
		name = null,
		email = null,
		emailVerified = false,
		phoneNumber = null,
		photoURL = null,
		provider = null,
		metadata = null,
		disabled = false,
		passwordHash = null,
		passwordSalt = null,
		tokensValidAfterTime = null,
		admin = false
	) {
		this.Id = id;
		this.Name = name;
		this.Email = email;
		this.EmailVerified = emailVerified;
		this.PhoneNumber = phoneNumber;
		this.PhotoURL = photoURL;
		this.Provider = provider;
		if (metadata) {
			this.CreationTime = metadata.creationTime || null;
			this.LastLogin = metadata.lastSignInTime || null;
			this.LastRefreshTime = metadata.lastRefreshTime || null;
		}
		this.Admin = admin;
		this.Disabled = disabled;
		this.PasswordHash = passwordHash;
		this.PasswordSalt = passwordSalt;
		this.TokensValidAfterTime = tokensValidAfterTime || null;
	}

	static create(source) {
		const user = new User(
			source.Id,
			source.Name,
			source.Email,
			source.EmailVerified,
			source.PhoneNumber,
			source.PhotoURL,
			source.Provider
		);
		user.CreationTime = source.CreationTime;
		user.LastLogin = source.LastLogin;
		user.LastRefreshTime = source.LastRefreshTime;
		user.Admin = source.Admin;
		user.Disabled = source.disabled;
		user.PasswordHash = source.passwordHash;
		user.PasswordSalt = source.passwordSalt;
		user.TokensValidAfterTime = source.tokensValidAfterTime;
	}

	static get TableHeaders() {
		return ['Id', 'Name', 'Email', 'Phone Number', 'PhotoURL', 'Provider', 'Creation Time', 'Last Login', 'Admin'];
	}

	static get ProfileHeaders() {
		return ['Id', 'Name', 'Email', 'Phone Number', 'Creation Time', 'Last Login', 'Provider', 'Admin'];
	}

	get Dummy() {
		this.Name = 'John Doe';
		this.Email = 'dummy@gmail.com';
		this.PhoneNumber = '+1-111-111-1111';
		this.PhotoURL = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
		this.Provider = 'google.com';
		this.CreationTime = dayjs().format(dateTimeBigQueryFormat);
		this.LastLogin = dayjs().format(dateTimeBigQueryFormat);
		this.LastRefreshTime = dayjs().format(dateTimeBigQueryFormat);
		this.Admin = false;
		this.Disabled = false;
		this.PasswordHash = 'undefined';
		this.PasswordSalt = 'undefined';
		this.TokensValidAfterTime = 'undefined';
		return this;
	}

	static fromJson(json) {
		return new User(json);
	}

	static toJson() {
		return {
			Id: this.Id,
			Name: this.Name,
			Email: this.Email,
			PhoneNumber: this.PhoneNumber,
			PhotoURL: this.PhotoURL,
			Provider: this.Provider,
			CreationTime: this.CreationTime,
			LastLogin: this.LastLogin,
			Admin: this.Admin,
		};
	}

	static fromFirebase = (user) => {
		const res = new User();

		res.Id = user.uid;
		const providerData = user.providerData.find((obj) => obj.hasOwnProperty('providerId'));
		res.Name = user.displayName || providerData.displayName || null;
		res.EmailVerified = user.emailVerified || providerData.emailVerified || false;
		res.Disabled = user.disabled || providerData.disabled || false;
		res.Email = user.email || providerData.email || null;
		res.PhoneNumber = user.phoneNumber || providerData.phoneNumber || null;
		res.PhotoURL = user.photoURL || providerData.photoURL || null;
		res.Provider = providerData ? providerData.providerId : null;
		const metadata = user.metadata || null;
		if (metadata) {
			res.CreationTime = metadata.creationTime || null;
			res.LastLogin = metadata.lastSignInTime || null;
			res.LastRefreshTime = metadata.lastRefreshTime || null;
		}

		res.PasswordHash = user.passwordHash || null;
		res.PasswordSalt = user.passwordSalt || null;
		res.TokensValidAfterTime = user.tokensValidAfterTime || null;
		res.Admin = AdminsDB.exists(res.Id);
		return res;
	};

	static toFirebase() {
		return {
			uid: this.Id,
			displayName: this.Name,
			email: this.Email,
			phoneNumber: this.PhoneNumber,
			photoURL: this.PhotoURL,
			providerData: [
				{
					providerId: this.Provider,
				},
			],
			metadata: {
				creationTime: this.CreationTime,
				lastSignInTime: this.LastLogin,
			},
			isAnonymous: this.Admin,
		};
	}

	static getType(prop) {
		return User.__boolProps.includes(prop) ? 'BOOLEAN' : User.__datetimeProps.includes(prop) ? 'DATETIME' : 'STRING';
	}

	static getMode(prop) {
		return User.__requireProps.includes(prop) ? 'REQUIRED' : 'NULLABLE';
	}

	static schema() {
		const keys = Object.keys(new User());
		return keys.map((prop) => {
			return {
				name: prop,
				type: this.getType(prop),
				mode: this.getMode(prop),
			};
		});
	}

	static convertDatetimeToUi(...args) {
		return args.map((datetime) => {
			if (datetime) return dayjs(datetime.value).format(dateTimeUiFormat);
			else return null;
		});
	}

	static convertDatetimeToBigQuery(...args) {
		return args.map((datetime) => {
			if (datetime) return dayjs(datetime.value).format(dateTimeBigQueryFormat);
			else return null;
		});
	}

	static toUi(users) {
		try {
			if (Array.isArray(users)) {
				return users.map((user) => {
					const converted = User.convertDatetimeToUi(
						user.CreationTime,
						user.LastLogin,
						user.LastRefreshTime,
						user.TokensValidAfterTime
					);
					user.CreationTime = converted[0];
					user.LastLogin = converted[1];
					user.LastRefreshTime = converted[2];
					user.TokensValidAfterTime = converted[3];
					return user;
				});
			} else {
				const converted = User.convertDatetimeToUi(
					users.CreationTime,
					users.LastLogin,
					users.LastRefreshTime,
					users.TokensValidAfterTime
				);
				users.CreationTime = converted[0];
				users.LastLogin = converted[1];
				users.LastRefreshTime = converted[2];
				users.TokensValidAfterTime = converted[3];
				return users;
			}
		} catch (e) {
			console.log(e.stack);
			console.log(e.message);
		}
	}

	static toBigQuery = (user) => {
		const converted = User.convertDatetimeToBigQuery(
			user.CreationTime,
			user.LastLogin,
			user.LastRefreshTime,
			user.TokensValidAfterTime
		);
		user.CreationTime = converted[0];
		user.LastLogin = converted[1];
		user.LastRefreshTime = converted[2];
		user.TokensValidAfterTime = converted[3];
		user.Admin = AdminsDB.exists(user.Id);
		return user;
	};
};

// john doe avatar image url https://api.adorable.io/avatars/285/

export default User;
