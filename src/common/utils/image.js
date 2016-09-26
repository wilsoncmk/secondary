import { env } from '../../schema/dev.js';
export function getPicUrl (path) {
    return env.pro + path;
};
