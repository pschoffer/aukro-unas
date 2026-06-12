import * as admin from 'firebase-admin';
import {onRequest} from 'firebase-functions/https';
import {setGlobalOptions} from 'firebase-functions';
import {apiWrapper} from './utils/api';
import {authenticateWithAukro} from './utils/aukro';
import {getConfig, storeAukroCredentials} from './utils/firebase';

admin.initializeApp();
setGlobalOptions({maxInstances: 10});

const region = 'europe-west1';

export const aukroLogin = onRequest({region, cors: true}, (req, res) => {
    return apiWrapper(req, res, async () => {
        const {username, password} = req.body as {username: string; password: string};
        if (!username || !password) {
            throw new Error('client: Missing username or password');
        }

        const config = await getConfig();
        await authenticateWithAukro(username, password, config);

        const uid = `aukroUser:${username}`;
        await storeAukroCredentials(uid, username, password);

        const firebaseToken = await admin.auth().createCustomToken(uid, {aukroUsername: username});

        res.send({firebaseToken, username});
    });
});
