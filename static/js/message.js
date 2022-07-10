import $ from 'jquery';
const feedback = $('#message-feedback-id');
const messageInput = $('#message-input').first();
const messageCont = $('#message');

let message = '';
export const onInputHandler = (event) => {
	message = event.target.value;
	if (message) {
		feedback.empty().append('Looks good!👌');
		feedback.removeClass('invalid-feedback').addClass('valid-feedback');
		feedback.css('color', 'green');
		messageInput.removeClass('is-invalid').addClass('is-valid');
	} else {
		feedback.empty().append('Message cannot be empty');
		feedback.removeClass('valid-feedback').addClass('invalid-feedback');
		feedback.css('color', 'red');
		messageInput.removeClass('is-valid').addClass('is-invalid');
	}
};

export const onMessageSwitchChangeHandler = (event) => {
	if (event.target.checked) {
		messageInput.removeAttr('required');
		messageInput.removeClass('is-invalid');

		message = null;
	} else {
		messageInput.attr('required', 'true');
		messageInput.addClass('is-invalid');
	}
	messageCont.collapse('toggle');
};
