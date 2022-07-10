/* eslint-disable */
import $ from 'jquery';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { getAuth } from 'firebase/auth';
import { FirebaseUI } from './helpers.js';
import { setPersistence, inMemoryPersistence } from 'firebase/auth';

const uiConfig = FirebaseUI.Config;

const getFirebaseConfig = async () => {
	const response = await axios.get('/api/firebase');
	return response.data;
};

export const firebaseInit = async () => {
	const firebaseConfig = await getFirebaseConfig();

	const firebase = initializeApp(firebaseConfig);
	const auth = getAuth(firebase);

	// analytics = firebase.analytics();
	// await setPersistence(auth, browserSessionPersistence);

	setPersistence(auth, inMemoryPersistence);

	uiConfig.callbacks.uiShown = () => {
		$('#loader').css('display', 'none');
	};

	const ui = new firebaseui.auth.AuthUI(auth);
	ui.disableAutoSignIn();

	$('#main-spinner').remove();
	const widget = $('#firebaseui-auth-container').first();
	if (widget.length > 0) {
		ui.start(widget[0], uiConfig);
	}
};
