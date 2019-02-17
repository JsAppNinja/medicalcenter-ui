const dotenv = require('dotenv');

// initializing env variables
try {
  dotenv.config();  // eslint-disable-line
} catch (e) {
  console.log('Could not find .env file. Continuing..'); // eslint-disable-line
}

module.exports = {
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: '30d',
  neo4jURL: process.env.NEO4J_URL,
  neo4jUser: process.env.NEO4J_USER,
  neo4jPass: process.env.NEO4J_PASS,
  firebaseApiKey: process.env.FIREBASE_APIKEY,
  firebaseAuthDomain: process.env.FIREBASE_AUTHDOMAIN,
  firebaseDatabaseURL: process.env.FIREBASE_DATABASEURL,
  firebaseProjectId: process.env.FIREBASE_PROJECTID,
  firebaseStorageBucket: process.env.FIREBASE_STORAGEBUCKET,
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
  mailgunUrl: process.env.MAILGUN_URL,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  mailgunEmail: process.env.MAILGUN_EMAIL,
  mailgunSecret: process.env.MAILGUN_SECRET,
  mailgunKey: process.env.MAILGUN_KEY,
};
