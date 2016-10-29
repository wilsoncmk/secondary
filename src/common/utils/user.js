

const user = {};
const query = document.location.search
const reg = /\?user=(.*)&openid=(.*)/
console.log('i m here')
if (reg.test(query)) {
    const match = query.match(reg);
    user.token = match[1];
    user.openid = match[2];
    window.user = user;
    console.log('i m here in user.js')
    console.log(window.user)
}


export default user;

