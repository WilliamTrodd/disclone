const firebaseAdmin = require('../config/firebase-config');

export const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodeValue = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodeValue) {
      console.log(decodeValue);
      return next();
    }
    return res.json({message: "Unauthorized"});
  } catch (e) {
    return res.json({ message: "Internal Error"});
  }
}

