import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

export const apiWrapper = (
    request: any,
    response: any,
    handler: () => Promise<any>
): Promise<void> => {
    return new Promise<void>((resolve) => {
        handler()
            .catch((error: any) => {
                const msg = error?.message || '';
                if (msg.includes('auth:')) {
                    response.status(401).send(msg);
                    return;
                }
                if (msg.includes('client:')) {
                    logger.warn('Client error: ' + msg);
                    response.status(400).send(msg);
                    return;
                }
                logError(error);
                response.status(500).send(msg);
            })
            .finally(() => resolve());
    });
};

export const logError = (error: any) => {
    if (error?.response) {
        const url = error.response.config?.url || 'unknown URL';
        const rawData = error.response.data;
        const data = typeof rawData === 'string' ? {responseBody: rawData.slice(0, 1000)} : (rawData || {});
        logger.error(error.message, {...data, url});
    } else {
        logger.error('Custom error:', error);
    }
};

export const requireAuth = async (request: any): Promise<{uid: string}> => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('auth: Missing or invalid auth header');
    }
    try {
        const token = (authHeader as string).split('Bearer ')[1];
        const result = await admin.auth().verifyIdToken(token);
        return {uid: result.uid};
    } catch {
        throw new Error('auth: Invalid token');
    }
};
