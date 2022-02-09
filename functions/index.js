const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
   
exports.hitCounter = functions.https.onRequest((req, res) => {
    const counterRef = admin.database().ref("/hit_counter");
    return counterRef
        .transaction(current => {
        return (current || 0) + 1;
        })
  });