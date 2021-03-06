import firebase, { auth } from '../firebase';
import userService from './userService';

const signup = (email, password) => {
	return auth()
		.createUserWithEmailAndPassword(email, password)
		.then(({ user }) => {
			return userService.create({
				email,
				firebaseId: user.uid,
				refreshToken: user.refreshToken,
				accessToken: user.za,
			})
		});
}

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
		.then(userData => {
			if (!userData) throw userData;

			return userService.login(userData?.user.za);
		})
		.then(res => {
			if (!res.ok) {
				throw res;
			}
			localStorage.setItem('user', JSON.stringify(res.user));
			return res.user;
		})
}

const logout = () => {
	localStorage.removeItem('user');
	return auth().signOut();
}

const verifyAuth = (updateUserInfo, setError) => {
	firebase.auth().onAuthStateChanged(async (user) => {
		if (user?.metadata?.lastSignInTime === user?.metadata?.creationTime) {
			return;
		}

		if (user) {
			user.getIdToken()
				.then(userService.login)
				.then(userInfo => {
					if (!userInfo.ok) {
						throw userInfo;
					}

					updateUserInfo(userInfo.user)
				})
				.catch(err => setError(err.message));
		}
	});
}

const user = () => auth().currentUser;

const updateEmail = (email) => user().updateEmail(email)

const update = (data) => user().updateProfile(data)

const firebaseService = {
	signup,
	login,
	logout,
	verifyAuth,
	update,
	updateEmail,
};

export default firebaseService