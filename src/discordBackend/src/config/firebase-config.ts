const admin = require('firebase-admin')

const serviceAccount = require('../../discordCloneServiceAccKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

module.exports = admin
