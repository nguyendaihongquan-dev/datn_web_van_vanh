const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
databaseURL: "https://smartparking-bf0a0-default-rtdb.firebaseio.com"
}); 

async function verifyIdToken(idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log("Token verified:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Error verifying ID token:", error);
      throw error;
    }
  }