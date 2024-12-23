const admin = require("firebase-admin");
const serviceAccount = require("./config/fire-homes-5e1aa-firebase-adminsdk-9l10g-942f4387ae.json"); // Use your downloaded JSON file name

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace with your email
const userEmail = "yilmaz8596@gmail.com";

admin
  .auth()
  .getUserByEmail(userEmail)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log("Successfully made user admin");
    process.exit();
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
