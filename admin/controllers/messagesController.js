import twilio from 'twilio';
import { MailService } from '@sendgrid/mail';
import AppSettings from '../../utils/appsettings.js';
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const sgMail = new MailService();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

const from = String(process.env.TWILIO_NUMBER);

const getSenderPage = (req, res) => {
	const { messages, error } = AppSettings.pages;
	const { layout } = AppSettings;
	const admin = req.baseUrl.includes('admin');
	const { userData } = req;
	const isLogedIn = userData ? true : false;
	layout.menu.items = admin ? layout.menu.admin : layout.menu.default;
	if (admin) {
		res.render('Sender', {
			isLogedIn,
			userData,
			content: messages,
			layout,
		});
	} else {
		res.render('Error', {
			isLogedIn,
			userData,
			content: error,
			layout,
		});
	}
};

const prepareMessages = (req, res, next) => {
	const { contacts, message, sendAt, now, subject } = req.body;
	const { via } = req.params;
	const messages = [];
	contacts.map((contact) => {
		if (contact.send) {
			let messageObj = {};
			if (via === 'email') {
				messageObj = {
					to: contact.email,
					from: AppSettings.my_email,
					subject: subject || 'Message from Guy Shaked',
					text: message || `Hi ${contact.displayName || ''}, this is a test message from ${req.userData.name}`,
				};
			} else {
				messageObj = {
					messagingServiceSid,
					from: `${via === 'whatsapp' ? 'whatsapp:' : ''}${from}`,
					body: message || `Hi ${contact.displayName || ''}, this is a test message from ${req.userData.name}`,
					to: `${via === 'whatsapp' ? 'whatsapp:' : ''}${contact.phoneNumber}`,
				};
				if (!now) {
					messageObj['sendAt'] = sendAt;
					messageObj['scheduleType'] = 'fixed';
				}
			}
			messages.push(messageObj);
		}
	});

	req.messages = messages;
	next();
};

const sendMessage = (req, res) => {
	const { messages } = req;
	const { via } = req.params;
	const admin = req.baseUrl.includes('admin');
	if (admin) {
		if (via === 'email') {
			messages.map((message) => {
				sgMail.send(message).then((message) => console.log('Email sent'));
			});
		} else {
			messages.map((message) => {
				twilioClient.messages
					.create(message)
					.then((message) => console.log(message.sid))
					.done();
			});
		}
		res.end(JSON.stringify({ status: 'success' }));
	} else {
		res.end(JSON.stringify({ status: 'Unauthorized, Admin only' }));
	}
};

// const receivingMessages = (req, res) => {
// 	const twiml = new MessagingResponse();

// 	twiml.message('The Robots are coming! Head for the hills!');

// 	res.writeHead(200, { 'Content-Type': 'text/xml' });
// 	res.end(twiml.toString());
// };

export { getSenderPage, prepareMessages, sendMessage };
