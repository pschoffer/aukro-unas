export const PATHS = {
    LOGIN: '/login',
    DASHBOARD: '/',
} as const;

export const COLLECTIONS = {
    CONFIG: 'config',
    USERS: 'users',
    SECRETS: 'secrets',
} as const;

export const SECRETS_KEYS = {
    AUKRO_CREDENTIALS: 'aukroCredentials',
    UNAS_CREDENTIALS: 'unasCredentials',
} as const;
