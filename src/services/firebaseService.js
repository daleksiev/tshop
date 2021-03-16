import { auth } from 'firebase';

const signup = auth().createUserWithEmailAndPassword;

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
			.then(user => {
				if(!user) throw user;

				localStorage.setItem('user', user);
				return user;
			});
}

const logout = () => {
	localStorage.removeItem('user');
	return auth().signOut();
}

export default {
	signup,
	login,
	logout,
}