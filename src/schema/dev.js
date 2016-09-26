import _ from 'lodash';
export const env = {
    mock: '',
    local: 'http://192.168.1.56:8070/',
    pro: 'http://121.42.222.0/'
}

const _env = env.pro;

export default function getCompleteUrl (api) {
    return _.mapValues(api, (v) => {
        return _env + v;
    });
}

