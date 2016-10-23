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
        <div class="load-more" @click="getMore()" v-if="!emptyList">加载更多</div>
        <div class="load-finish" v-else>只有这么多啦~</div>
    </div>
</template>

<script>
import './my.scss'
import listLayout from './listLayout.vue'
import { setMyItems, setMyCategory } from '../../../vuex/index/action'
import secondaryApi from '../../../schema/api/secondary';
import user from '../../../common/utils/user';
import usersApi from '../../../schema/api/users'

const loginInfo = {
    name: '闵行大活',
    password: '123456'
}
const pagesize = 5;
let pageindex = 0;
let token = null;
const status = {
    saled: '已出售',
    unsaled: '未出售'
}
const param = {
    state: '未出售',
    openid: user.openid,
    token: user.token,
    pagesize,
    pageindex
};

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
            emptyList: false
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
            token = user.token;
            this.changeCategory('unsaled');
        },
        getMore () {
            this.emptyList = false;
            Object.assign(param, {
                pageindex
            });
            $.weui.loading('数据加载中...');
            this.$http.post(secondaryApi.all, param).then((response) => {
                const res = response.data.data;
                this.setMyItems(pageindex, res);
                $.weui.hideLoading();
                if (res.length > 0 && (pageindex + 1) * pagesize < res[0].total) {
                    pageindex++;
                } else {
                    this.emptyList = true;
                }
            })
        },
        changeCategory (cate) {
            this.curTab = cate;
            pageindex = 0;
            Object.assign(param, {
                state: status[cate],
                pageindex: 0
            });
            $.weui.loading('数据加载中...');
            this.$http.post(secondaryApi.all, param).then((response) => {
                const res = response.data.data;
                this.setMyCategory(pageindex, res);
                $.weui.hideLoading();
                if (res.length > 0 && (pageindex + 1) * pagesize < res[0].total) {
                    pageindex++;
                } else {
                    this.emptyList = true;
                }
            })
        }
    }
}
</script>



