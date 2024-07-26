// firebaseAdmin.ts
import * as admin from 'firebase-admin';
import * as serviceAccount from './config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
