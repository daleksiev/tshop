import {auth} from '../firebase';

const signup = (email,password) => auth().createUserWithEmailAndPassword(email,password);

const login = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			if (!user) throw user;

			localStorage.setItem('user', user);
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