<template>
    <div class="secondary-list">
        <secondary-list-filter :optionchanged="handleCategoryChanged">
        </secondary-list-filter>
        <scroll  :bottom-height="btnHeight"  
                 :top-height="topHeight" 
                 :use-pullup="true" 
                 @pullup:loading="upLoading" 
                 @pullup:complete="upDone">
                 <ul>
                     <list-layout :list="value.list" :index="value.index" v-for="(key, value) of lists"></list-layout>
                 </ul>
                
        </scroll>
    </div>
</template>

<script>
import scroll from '../../../common/iscroll/scroll.vue';
import './secondaryList.scss'
import listLayout from './listLayout.vue';
import secondaryListFilter from '../secondaryListFilter/secondaryListFilter.vue';
import { setItems, setCategory } from '../../../vuex/index/action';
import secondaryApi from '../../../schema/api/secondary';
import usersApi from '../../../schema/api/users';
import user from '../../../common/utils/user';

const loginInfo = {
    name: '闵行大活',
    password: '123456'
}
const pagesize = 3;
let pageindex = 0;
let token = null;
let uuid = null;

export default {
    vuex: {
        getters: {
            lists: state => state.lists
        },
        actions: {
            setItems,
            setCategory
        }
    },
    data () {
        return {
            curTab: 'bike',
            btnHeight: '40px',
            topHeight: '40px'
        }
    },
    components: {
        listLayout,
        scroll,
        secondaryListFilter
    },
    created () {
        this.curTab = 'bike';
        setTimeout(() => {
            this.$broadcast('scroll-reset', 'container');
        }, 2000)
        this.fetchList();
    },
    methods: {
        upLoading (_uuid) {
            uuid = _uuid;
            console.log('pullup');
            this.getNextPage().then((response) => {
                this.setItems(pageindex, response.data.data);
                if ((pageindex + 1) * pagesize < response.data.data[0].total) {
                    pageindex++;
                    this.$broadcast('pullup:reset', uuid)
                } else {
                    this.$broadcast('pullup:done', uuid)
                    // this.$broadcast('pullup:reset', uuid)
                }
            });
        },
        upDone () {
            console.log('done');
        },
        fetchList () {
            const _vue = this;
            this.$http.post(usersApi.login, loginInfo).then((res) => {
                token = res.data.data.token;
                if (window.localStorage) {
                    window.localStorage.setItem('ecnu_token', token);
                    this.getAll(_vue, {
                        token,
                        pagesize,
                        pageindex
                    });
                }
            });
            // token = user.token;
            // this.getAll(_vue, {
            //     token,
            //     pagesize,
            //     pageindex
            // });
        },
        getAll (_vue, param) {
            _vue.$http.post(secondaryApi.all, param).then((response) => {
                this.setItems(pageindex, response.data.data);
                if ((pageindex + 1) * pagesize < response.data.data[0].total) {
                    pageindex++;
                }
            });
        },
        getNextPage () {
            return this.$http.post(secondaryApi.all, {
                token,
                pagesize,
                pageindex
            })
        },
        handleCategoryChanged (cate) {
            this.$broadcast('scroll-reset', uuid)
            pageindex = 0;
            this.$http.post(secondaryApi.all, {
                token,
                pagesize,
                pageindex,
                category: cate === '全部' ? undefined : cate
            }).then((response) => {
                this.setCategory(pageindex, response.data.data);
                if ((pageindex + 1) * pagesize < response.data.data[0].total) {
                    pageindex++;
                }
            });
        }
    }
}
</script>



