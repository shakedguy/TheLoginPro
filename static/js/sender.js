import $ from 'jquery';
import Cookies from 'js-cookie';
import { dateTimeValidation, toSendNow } from './schedule.js';
import { contacts } from './mailingList.js';
const toastHeader = $('#message-toast-header').first();
const liveToast = $('#notification').first();
const toastText = $('#toast-text');
const scheduleSwitch = $('#schedule-switch');
const messageText = $('#message-input');
const subjectInput = $('#subject');

const checkCheckboxes = () => {
	const checkboxes = $('.mailing-list-checkbox').toArray();
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) return true;
	});
	return checkboxes;
};

const formValidation = () => {
	if (!checkCheckboxes()) {
		if (liveToast.length > 0) {
			liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastHeader.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastText.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			const toast = new bootstrap.Toast(liveToast);
			toastText.empty().append('You must select at least one contact ‼️😬');
			toast.show();
		}
		return false;
	}
	if (!$('#message-switch').is(':checked') && !messageText.val()) {
		if (liveToast.length > 0) {
			liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastHeader.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastText.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			const toast = new bootstrap.Toast(liveToast);
			toastText.empty().append('Message body can not be emty‼️😬');
			toast.show();
		}
		return false;
	}

	if (!scheduleSwitch.is(':checked') && !dateTimeValidation(datePicker.value)) {
		if (liveToast.length > 0) {
			liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastHeader.removeClass('bg-primary bg-seccess').addClass('bg-danger');
			toastText.removeClass('bg-primary bg-seccess').addClass('bg-danger');

			const toast = new bootstrap.Toast(liveToast);
			const msg = datePicker.value ? 'Must be at least 1 hour ahead‼️😬' : 'You must pick date and time‼️😬';
			toastText.empty().append(msg);
			toast.show();
		}
		return false;
	}
	return true;
};

export const submitHandler = async (event) => {
	const now = toSendNow();
	event.preventDefault();
	const via = event.originalEvent.submitter.id;

	if (formValidation()) {
		const sendAt = new Date(datePicker.value);

		const message = messageText.val() || null;

		const subject = subjectInput.val() || null;
		await fetch(`/admin/messages/${via}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'CSRF-Token': Cookies.get('XSRF-TOKEN'),
			},
			body: JSON.stringify({ contacts, subject, message, now, sendAt, via }),
		});

		if (liveToast.length > 0) {
			liveToast.removeClass('bg-danger bg-primary').addClass('bg-success');
			toastHeader.removeClass('bg-danger bg-primary').addClass('bg-success');
			toastText.removeClass('bg-danger bg-primary').addClass('bg-success');
			const toast = new bootstrap.Toast(liveToast);
			const msg = via === 'email' ? 'Email' : 'Message';
			if (now) {
				toastText.empty().append(`${msg} sent successfully‼️ 🚀`);
			} else {
				toastText
					.empty()
					.append(
						`${msg} scheduled to  ${sendAt.getDate()}/${
							sendAt.getMonth() + 1
						}/${sendAt.getFullYear()}  at  ${sendAt.getHours()}:${sendAt.getMinutes()} 🚀`
					);
			}
			toast.show();
		}
	}
};
