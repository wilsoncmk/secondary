<template>
    <div class="secondary-list my-wrapper">
             <section class="sec-nav">
            <div class="buttons-tab">
                <a href="#tab1" class="tab-link button j-nav-bike {{ curTab === 'unsaled' ? 'active' : ''}}" @click="changeCategory('unsaled')">未出售</a>
                <a href="#tab2" class="tab-link button  j-nav-book {{ curTab === 'saled' ? 'active' : ''}}" @click="changeCategory('saled')">已出售</a>
            </div>
        </section>
        <div class="list-container">
            <list-layout :list="value.list" :index="value.index" v-for="(key, value) of lists"></list-layout>
        </div>
        <div class="empty-item-wrapper" v-if="emptyList"><span>项目为空哦~</span></div>
    </div>
</template>

<script>
import './my.scss'
import listLayout from './listLayout.vue'
import { setMyItems, setMyCategory } from '../../../vuex/index/action'
import secondaryApi from '../../../schema/api/secondary';
import usersApi from '../../../schema/api/users'

const loginInfo = {
    name: '闵行大活',
    password: '123456'
}
const pageSize = 5;
let pageIndex = 0;
let token = null;

export default {
    vuex: {
        getters: {
            lists: state => state.myLists
        },
        actions: {
            setMyItems,
            setMyCategory
        }
    },
    data () {
        return {
            curTab: 'unsaled',
            emptyList: true
        }
    },
    components: {
        listLayout
    },
    created () {
        this.fetchList();
    },
    methods: {
        fetchList () {
            const _vue = this;
            this.$http.post(usersApi.login, loginInfo).then((res) => {
                token = res.data.data.token;
                if (window.localStorage) {
                    window.localStorage.setItem('ecnu_token', token);
                    this.getAll(_vue, {
                        token,
                        pageSize,
                        pageIndex,
                        state: '未出售',
                        openid: window.localStorage.getItem('ecnu_openid')
                    }, 'unsaled');
                }
            });
        },
        getAll (_vue, param, cate) {
            _vue.$http.post(secondaryApi.all, param).then((response) => {
                const res = response.data.data;
                this.setMyCategory(pageIndex, res);
                this.curTab = cate;
                if (pageIndex < res.total) {
                    pageIndex++;
                }
                if (res.length === 0) {
                    this.emptyList = true;
                } else {
                    this.emptyList = false;
                }
            })
        },
        changeCategory (cate) {
            if (cate === 'unsaled') {
                const _vue = this;
                this.getAll(_vue, {
                    token,
                    pageSize,
                    pageIndex,
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '未出售'
                }, cate);
                
            } else if (cate === 'saled') {
                const _vue = this;
                this.getAll(_vue, {
                    token,
                    pageSize,
                    pageIndex,
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '已出售'
                }, cate);
            }
        }
    }
}
</script>



