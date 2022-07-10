import $ from 'jquery';
import { onScheduledSwitchChangeHandler, onInputDateHandler, scheduleSwitch, datePicker } from './schedule.js';
import { submitHandler } from './sender.js';
import { firebaseInit } from './firebase.js';
import initMenu, { canvas, arrow } from './menu.js';
import { getHtmlMessagesList } from './mailingList.js';
import { onMessageSwitchChangeHandler, onInputHandler } from './message.js';
import {
	dataTableInit,
	updateAdminsUi,
	onClickAddAdminsHandler,
	tableToast,
	tableToastHeader,
	tableToastText,
} from './users.js';
import { tableConfigs, darkModeBtn, setDarkMode, setLightMode, toTitleCase, getLocation } from './helpers.js';
import { tooltipsInit } from './tooltips.js';

const mainSpinner = $('#main-spinner').first();
const lists = $('.list-group-item');
const isAdmin = window.location.pathname.includes('admin');

// logout toast
$('#btn-logout-toast').click(() => new bootstrap.Toast($('#logout-toast')).show());

// logout button
$('#btn-logout').click(() => window.location.replace('/logout'));

lists.text((i, text) => toTitleCase(text));

const toggleDarkMode = () => {
	const darkMode = sessionStorage.getItem('theme') === 'dark';
	darkMode ? setLightMode() : setDarkMode();
};

const initTheme = () => {
	const sessionScheme = sessionStorage.getItem('theme');
	if (sessionScheme) {
		sessionScheme === 'dark' ? setDarkMode() : setLightMode();
	} else {
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		darkMode ? setDarkMode() : setLightMode();
	}
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	const sessionScheme = sessionStorage.getItem('theme');
	const systemScheme = event.matches ? 'dark' : 'light';
	sessionScheme !== systemScheme && toggleDarkMode();
});

if (isAdmin) {
	$('#nav-btn-home').attr('href', '/admin');
	$('#login-button').attr('href', '/admin/login');
}

$(window).on('load', () => {
	if (mainSpinner.length > 0) {
		mainSpinner.css('visibility', 'hidden');
	}
});

$(window).ready(async () => {
	await initMenu();
	await firebaseInit();
	initTheme();
	tooltipsInit();

	const location = getLocation().toLowerCase();

	if (location.includes('messages')) {
		$('#message-form')
			.ready(async () => {
				mainSpinner.css('visibility', 'hidden');
				const contactList = await getHtmlMessagesList();
				$('#mailing-list-spinner').first().addClass('d-none');
				$('#contacts-list').first().append(contactList);
			})
			.submit(submitHandler);
		datePicker.on('input', onInputDateHandler);
		scheduleSwitch.on('change', onScheduledSwitchChangeHandler);
		$('#message-switch').change(onMessageSwitchChangeHandler);
		$('#message-input').on('input', onInputHandler);
	} else if (location.includes('users')) {
		await dataTableInit(tableConfigs);
	} else if (location.includes('profile')) {
		const alreadyLoggedToast = $('#already-logged-toast');
		if (alreadyLoggedToast.length > 0) {
			new bootstrap.Toast(alreadyLoggedToast).show();
		}
	}
	const avatar = $('.ui-avatar').first();
	const src = 'https://ui-avatars.com/api?name=' + avatar.attr('id') + '&background=f93154&color=fff';
	avatar.attr('src', src);
});
darkModeBtn.click(() => {
	document.documentElement.classList.add('transition');
	setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 1000);
	toggleDarkMode();
});

if (canvas.length > 0) {
	canvas.on('show.bs.offcanvas', () => {
		if (arrow.length > 0) {
			arrow.addClass('arrow-forward');
		}
	});
	canvas.on('hide.bs.offcanvas', () => {
		if (arrow.length > 0) {
			setTimeout(() => {
				arrow.removeClass('arrow-forward');
			}, 500);
		}
	});
}

$('#admin-table-btn').click(async () => {
	const response = await onClickAddAdminsHandler();
	if (response.error) {
		tableToast.removeClass('bg-primary bg-success').addClass('bg-danger');
		tableToastHeader.removeClass('bg-primary bg-success').addClass('bg-danger');
		tableToastText.empty().removeClass('bg-primary bg-success').addClass('bg-danger').append('Something Went Wrong 😬');
	} else {
		tableToast.removeClass('bg-primary bg-danger').addClass('bg-success');
		tableToastHeader.removeClass('bg-primary bg-danger').addClass('bg-success');
		tableToastText
			.empty()
			.removeClass('bg-primary bg-danger')
			.addClass('bg-success')
			.append('Admins Added Successfully 😎');
		updateAdminsUi();
	}
	const toast = new bootstrap.Toast(tableToast);
	toast.show();
});

$('#refresh-btn').click(() => window.location.reload());

// const instance = mdb.Sidenav.getInstance(document.getElementById('sidenav-1'));
// instance.show();
