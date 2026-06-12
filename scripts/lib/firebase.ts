import * as admin from 'firebase-admin';

export const PROJECT_ID = 'aukro-unas';

export const initFirebaseAdmin = () => {
    console.log('Using emulators');
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
    admin.initializeApp({ projectId: PROJECT_ID });
};
