import { initializeApp, cert, getApp } from 'firebase-admin/app';
import { Auth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { getFirestore } from 'firebase-admin/firestore';
import { BigQuery } from '@google-cloud/bigquery';

const credentials = {
	credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
	databaseURL: 'https://com-login-social-default-rtdb.firebaseio.com',
};

const bigQueryConfig = {
	projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
	credentials: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
};

const defaultApp = initializeApp(credentials);

const Admin = getApp(defaultApp.name);

const auth = new Auth(defaultApp);

const DB = getDatabase(defaultApp);

const Firestore = getFirestore(defaultApp);

const Bigquery = new BigQuery(bigQueryConfig);

export { auth, DB, Firestore, Bigquery };

export default Admin;
