import FirebaseClient from '../utils/firebaseConfigs.js';

export const getFirebaseConfig = (req, res) => {
	res.status(200).json(FirebaseClient);
};
