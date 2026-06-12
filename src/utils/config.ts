const FIREBASE_PROJECT = 'aukro-unas';
const REGION = 'europe-west1';
const EMULATOR_BASE = `http://127.0.0.1:5001/${FIREBASE_PROJECT}/${REGION}`;

const config = {
    useEmulators: (import.meta.env as any).VITE_USE_EMULATORS === 'true',
    functions: {
        aukroLogin: `https://aukrologin-PLACEHOLDER-ew.a.run.app`,
    },
};

if (config.useEmulators) {
    config.functions = {
        aukroLogin: `${EMULATOR_BASE}/aukroLogin`,
    };
}

export default config;
