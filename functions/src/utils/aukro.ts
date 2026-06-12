import axios from 'axios';
import { Config } from '../models/Config';

const AUKRO_API_KEY_HEADER = 'X-Aukro-Api-Key';

export const authenticateWithAukro = async (
    username: string,
    password: string,
    config: Config
): Promise<string> => {
    const endpoint = `${config.aukroBackend.prod}api/v2/authenticate`;
    const result = await axios.post(
        endpoint,
        { username, password },
        { headers: { [AUKRO_API_KEY_HEADER]: config.aukroApiKeys.prod } }
    );
    return result.data.token as string;
};
