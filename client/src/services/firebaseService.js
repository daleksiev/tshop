import { auth } from '../firebase';
import userService from './userService';

const signup = (email, password) => {
	return auth().createUserWithEmailAndPassword(email, password)
		.then(({ user }) => userService.create({
			email,
			firebaseId: user.uid,
			refreshToken: user.refreshToken,
			accessToken: user.za,
		})
		);
}

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
		.then(userData => {
			if (!userData) throw userData;

			return userService.login(userData?.user.za);
		})
		.then(res => {
			if (res.ok) {
				localStorage.setItem('user', JSON.stringify(res.user));
				return res.user;
			}
		})
		.catch(err => console.log(err));
}

const logout = () => {
	localStorage.removeItem('user');
	return auth().signOut();
}

const firebaseService = {
	signup,
	login,
	logout,
};

export default firebaseService