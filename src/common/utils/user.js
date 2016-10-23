const user = {};

user.openid = window.localStorage.getItem('openid');
user.token = window.localStorage.getItem('token');
user.nickname = window.localStorage.getItem('nickname');
user.sex = window.localStorage.getItem('sex');
user.headimgurl = window.localStorage.getItem('headimgurl');
user.token_time = window.localStorage.getItem('token_time');
// user.token='dadc78993ff9be68f205655c38ab2fad67fcbcf0';

export default user;

