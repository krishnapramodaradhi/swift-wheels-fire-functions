const functions = require('firebase-functions');
const app = require('./src/app');

exports.api = functions.region('asia-south1').https.onRequest(app);
