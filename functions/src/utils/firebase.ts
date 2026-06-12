import * as admin from 'firebase-admin';
import { Config } from '../models/Config';

const COLLECTIONS = {
    CONFIG: 'config',
    USERS: 'users',
    SECRETS: 'secrets',
};

const SECRETS_KEYS = {
    AUKRO_CREDENTIALS: 'aukroCredentials',
};

export const getConfig = async (): Promise<Config> => {
    const snap = await admin.firestore().doc(`${COLLECTIONS.CONFIG}/private`).get();
    return snap.data() as Config;
};

export const storeAukroCredentials = async (uid: string, login: string, password: string): Promise<void> => {
    const userRef = admin.firestore().doc(`${COLLECTIONS.USERS}/${uid}`);
    const secretsRef = admin.firestore().doc(
        `${COLLECTIONS.USERS}/${uid}/${COLLECTIONS.SECRETS}/${SECRETS_KEYS.AUKRO_CREDENTIALS}`
    );

    await Promise.all([
        userRef.set({ lastLoginAt: new Date() }, { merge: true }),
        secretsRef.set({ login, password }, { merge: true }),
    ]);
};
