import firebase, { auth } from '../firebase';
import userService from './userService';

const signup = (email, password) => {
	return auth()
		.createUserWithEmailAndPassword(email, password)
		.then(({ user }) => (
			userService.create({
				email,
				firebaseId: user.uid,
				refreshToken: user.refreshToken,
				accessToken: user.za,
			})
		));
}

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
		.then(userData => {
			if (!userData) throw userData;

			return userService.login(userData?.user.za);
		})
		.then(res => {
			if (res.ok) {
				return res.user;
			}
		})
		.catch(err => console.log(err));
}

const logout = () => auth().signOut();

const verifyAuth = (updateState) => {
	firebase.auth().onAuthStateChanged(async (user) => {
		if (user) {
			user.getIdToken()
				.then(userService.login)
				.then(userInfo => updateState(userInfo.user))
				.catch(err => console.log(err));
		}
	});
}

const firebaseService = {
	signup,
	login,
	logout,
	verifyAuth,
};

export default firebaseService