#!/usr/bin/env ts-node

import { initFirebaseAdmin } from './lib/firebase';
import { AUKRO_API_TEST_KEY, AUKRO_API_KEY } from './lib/secrets';

import * as admin from 'firebase-admin';

const USERS: Record<string, any> = {
    'schoffer.pavel@gmail.com': { superAdmin: true },
};

const CONFIG_PRIVATE = {
    devInstance: true,
    aukroBackend: {
        prod: 'https://aukro.cz/',
        test: 'https://be.djp.aukro.cloud/backend-web/',
    },
    aukroApiKeys: {
        prod: AUKRO_API_KEY,
        test: AUKRO_API_TEST_KEY,
    },
    masterKey: 'dev-master-key',
    superAdmins: ['schoffer.pavel@gmail.com'],
};

const initAuth = async () => {
    const auth = admin.auth();
    const allUsers = (await auth.listUsers()).users;

    for (const email of Object.keys(USERS)) {
        if (!allUsers.find((u: any) => u.email === email)) {
            console.log('Creating user', email);
            const newUser = await auth.createUser({ email, password: 'testtest' });
            await auth.setCustomUserClaims(newUser.uid, USERS[email]);
        }
    }
    console.log('Auth initialized');
};

const initDB = async () => {
    const firestore = admin.firestore();
    await firestore.doc('config/private').set(CONFIG_PRIVATE, { merge: true });
    console.log('DB initialized');
};

const main = async () => {
    initFirebaseAdmin();
    await initDB();
    await initAuth();
};

main();
