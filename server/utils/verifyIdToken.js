const admin = require('../config/firebase');
const userService = require('../services/userService');

const promiseResolve = () => { };
const promiseReject = () => { };


module.exports = (idToken) => {
    idToken = idToken?.split('Bearer ')?.join('');

    if (idToken) {
        return admin
            .auth()
            .verifyIdToken(idToken)
            .then((token) => userService.getOne({ firebaseId: token.uid }))
    }

    return Promise
        .reject(new Error({ ok: false, message: 'Unathorized' }))
        .then(promiseResolve, promiseReject);
}