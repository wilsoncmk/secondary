import getCompleteUrl from '../dev';

const secondaryApi = {
    all: 'secondary/all',
    new: 'secondary/new',
    upload: 'secondary/upload',
    update: 'secondary/update'
}

export default getCompleteUrl(secondaryApi);
