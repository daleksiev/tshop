import { auth } from '../firebase';
import userService from './userService';

const signup = (email, password) => {
	return auth().createUserWithEmailAndPassword(email, password)
		.then(({ user }) => userService.create({ email, firebaseId: user.uid }));
}

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			if (!user) throw user;

			localStorage.setItem('user', JSON.stringify(user));
			return user;
		});
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