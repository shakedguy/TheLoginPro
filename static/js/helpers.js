import $ from 'jquery';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	GithubAuthProvider,
	EmailAuthProvider,
	PhoneAuthProvider,
} from 'firebase/auth';
export const body = $('body').first();
export const darkModeBtn = $('#btn-dark-mode').first();

export const setLightMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'light');
	sessionStorage.setItem('theme', 'light');
	lables.removeClass('text-light').addClass('text-dark');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-moon"></i>');
};

export const setDarkMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
	lables.removeClass('text-dark').addClass('text-light');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-brightness-high"></i>');
};

export const toTitleCase = (str) => {
	return String(str).replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

export const getLocation = () => window.location.pathname;

export const tableConfigs = {
	dom: 'SfBrtip',

	tableTools: {
		sSwfPath: '/swf/copy_csv_xls_pdf.swf',
	},
	pageLength: 5,
	colReorder: true,
	scrollX: true,
	buttons: [
		{
			extend: 'copyHtml5',
			text: '',
			filename: 'Users Database',
			className: 'btn btn-outline-secondary ',
			exportOptions: {
				columns: ':visible',
			},
		},
		{
			extend: 'print',
			text: '',
			filename: 'Users Database',
			className: 'btn btn-outline-secondary',
			exportOptions: {
				columns: ':visible',
			},
		},
		{
			extend: 'csvHtml5',
			text: '',
			filename: 'Users Database',
			className: 'btn btn-outline-success',
			exportOptions: {
				columns: ':visible',
			},
		},
		{
			extend: 'excelHtml5',
			text: '',
			filename: 'Users Database',
			className: 'btn btn-outline-success',
			exportOptions: {
				columns: ':visible',
			},
		},
		{
			extend: 'pdfHtml5',
			text: '',
			filename: 'Users Database',
			className: 'btn btn-outline-danger',
			exportOptions: {
				columns: ':visible',
			},
		},
	],
};

class FirebaseUIClass {
	#config;
	#postIdToken;
	#successCallback;
	#signInOptions;
	constructor() {
		this.#signInOptions = [
			{
				provider: EmailAuthProvider.PROVIDER_ID,
				requireDisplayName: false,
			},
			GoogleAuthProvider.PROVIDER_ID,
			FacebookAuthProvider.PROVIDER_ID,
			'apple.com',
			'microsoft.com',
			TwitterAuthProvider.PROVIDER_ID,
			GithubAuthProvider.PROVIDER_ID,
			{
				provider: PhoneAuthProvider.PROVIDER_ID,
				recaptchaParameters: {
					type: 'image',
					size: 'normal',
					badge: 'bottomright',
				},
				defaultCountry: 'IL',
				defaultNationalNumber: '1234567890',
				loginHint: '+11234567890',
			},
		];

		this.#postIdToken = (url, idToken) => {
			return axios.post(
				url,
				{ idToken },
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'CSRF-Token': Cookies.get('XSRF-TOKEN'),
					},
				}
			);
		};

		this.#successCallback = (user, credential, redirectUrl) => {
			console.log('successCallback');
			user.getIdToken().then((idToken) => {
				const isAdmin = window.location.pathname.includes('admin');
				const url = isAdmin ? '/admin/login' : '/login';
				return this.#postIdToken(url, idToken).then(
					(response) => {
						if (response.status === 200) {
							let identifier = '';
							let name = user.email || user.phoneNumber;
							if (user.displayName) {
								identifier = `username=${user.displayName.replaceAll(' ', '')}`;
							} else if (user.email) {
								identifier = `email=${user.email}`;
							} else if (user.phoneNumber) {
								identifier = `phone-number=${user.phoneNumber}`;
							} else {
								identifier = `id=${user.uid}`;
							}
							const redirect = isAdmin ? '/admin' : '';
							const url = `${redirect}/profile?${identifier.toLowerCase()}`;
							// Cookies.set('profileURL', url);
							return window.location.assign(url);
						} else {
							return window.location.assign('/error');
						}
					},
					(error) => {
						return window.location.assign('/error');
					}
				);
			});
		};
		this.#config = {
			callbacks: {
				signInSuccessWithAuthResult: (authResult, redirectUrl) =>
					this.#successCallback(authResult.user, authResult.credential, redirectUrl),
				uiShown: () => {},
			},

			signInFlow: 'popup',
			signInSuccessUrl: '/profile',
			signInOptions: this.#signInOptions,

			tosUrl: 'https://www.google.com',

			privacyPolicyUrl: 'https://www.google.com',
		};
	}

	get Config() {
		return this.#config;
	}

	get SuccessCallback() {
		return this.#successCallback;
	}

	get PostIdToken() {
		return this.#postIdToken;
	}

	get SignInOptions() {
		return this.#signInOptions;
	}
}

const FirebaseUI = new FirebaseUIClass();
export { FirebaseUI };
