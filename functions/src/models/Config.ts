export interface Config {
    aukroApiKeys: {
        prod: string;
        test: string;
    };
    aukroBackend: {
        prod: string;
        test: string;
    };
    masterKey: string;
    superAdmins: string[];
}
