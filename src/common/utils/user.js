const user = {};

user.openid = window.localStorage.getItem('openid');
user.token = window.localStorage.getItem('token');
user.nickname = window.localStorage.getItem('nickname');
user.sex = window.localStorage.getItem('sex');
user.headimgurl = window.localStorage.getItem('headimgurl');
user.token_time = window.localStorage.getItem('token_time');

console.log(user.token);

export default user;

