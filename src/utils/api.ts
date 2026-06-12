import config from './config';

export interface AukroLoginResult {
    firebaseToken: string;
    username: string;
}

export const aukroLogin = async (username: string, password: string): Promise<AukroLoginResult> => {
    const response = await fetch(config.functions.aukroLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Login failed');
    }

    return response.json();
};
