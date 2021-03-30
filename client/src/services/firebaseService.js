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
	const localStorageUser = JSON.parse(localStorage.getItem('user'));

	if (localStorageUser?.email) {
		updateUserInfo({ ...localStorageUser, isLoggedIn: true });
	}

	firebase.auth().onAuthStateChanged(async (user) => {
		if (user?.metadata?.lastSignInTime === user?.metadata?.creationTime) {
			return;
		}

		if (user) {
			user.getIdToken()
				.then((token) => userService.login(token))
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

const firebaseService = {
	signup,
	login,
	logout,
	verifyAuth,
};

export default firebaseService