import $ from 'jquery';
export const datePicker = $('#datePicker');
const scheduleFeedback = $('#schedule-feedback');
export const scheduleSwitch = $('#schedule-switch');
const scheduleCont = $('#schedule-collapse');

export const onScheduledSwitchChangeHandler = (event) => {
	if (event.target.checked) {
		datePicker.removeAttr('required');
		datePicker.removeClass('is-invalid');
	} else {
		datePicker.attr('required', 'true');
		datePicker.addClass('is-invalid');
	}
	scheduleCont.collapse('toggle');
};

export const dateTimeValidation = (dateTime) => {
	const millisecondsToHours = 1000 * 60 * 60;
	const now = new Date();
	const distance = new Date(dateTime) - now;
	return distance >= millisecondsToHours;
};

export const onInputDateHandler = (event) => {
	if (event.target.value.length === 0) {
		scheduleFeedback.empty().append('Required');
		scheduleFeedback.addClass('is-invalid').css('color', 'red');
	}

	const date = new Date(event.target.value);
	if (dateTimeValidation(date)) {
		scheduleFeedback.empty().append('Looks good!👌');
		scheduleFeedback.addClass('valid-feedback').css('color', 'green');
	} else {
		scheduleFeedback.empty().append('Must be at least 1 hour ahead');
		scheduleFeedback.addClass('is-invalid').css('color', 'red');
	}
};

export const toSendNow = () => scheduleSwitch.is(':checked');
