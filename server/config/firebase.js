var admin = require("firebase-admin");

var serviceAccount = require("./t-shop-e1948-firebase-adminsdk-wvpua-7b3b814c49.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;