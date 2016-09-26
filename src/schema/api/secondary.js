import getCompleteUrl from '../dev';

const secondaryApi = {
    all: 'secondary/all',
    new: 'secondary/new',
    upload: 'secondary/upload',
    update: 'secondary/update'
}

console.log(getCompleteUrl(secondaryApi));

export default getCompleteUrl(secondaryApi);
