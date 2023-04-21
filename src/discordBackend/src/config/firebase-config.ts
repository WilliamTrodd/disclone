import * as admin from 'firebase-admin'
import serviceAccount from '../../discordCloneServiceAccKey.json'

const acc = serviceAccount as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(acc),
})

export { admin }
