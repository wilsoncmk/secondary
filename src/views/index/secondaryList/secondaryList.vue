<template>
    <div class="secondary-list">
        <secondary-list-filter :optionchanged="handleCategoryChanged">
        </secondary-list-filter>
        <list-layout :list="value.list" :index="value.index" v-for="(key, value) of lists"></list-layout>
        <div class="load-more" @click="getMore()" v-if="!loadFinish">加载更多</div>
        <div class="load-finish" v-else>只有这么多啦~</div>
    </div>
</template>

<script>
import './secondaryList.scss'
import listLayout from './listLayout.vue';
import secondaryListFilter from '../secondaryListFilter/secondaryListFilter.vue';
import { setItems, setCategory } from '../../../vuex/index/action';
import secondaryApi from '../../../schema/api/secondary';
import user from '../../../common/utils/user';

const pagesize = 5;
let pageindex = null;
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
            topHeight: '40px',
            loadFinish: false
        }
    },
    components: {
        listLayout,
        secondaryListFilter
    },
    created () {
        this.curTab = '全部';
        this.loadmore = false;
        pageindex = 0;
        token = user.token;
        this.handleCategoryChanged(this.curTab);
    },
    methods: {
        upLoading (_uuid) {
            uuid = _uuid;
            this.getNextPage().then((response) => {
                this.setItems(pageindex, response.data.data);
                if ( (pageindex + 1) * pagesize < response.data.data[0].total){
                    pageindex++;
                } else {
                }
            });
        },
        upDone () {
        },
        getMore () {
            const param = {
                token,
                pagesize,
                pageindex,
                category: this.curTab === '全部' ? undefined : this.curTab
            };
            this.loadmore = true;
            $.weui.loading('数据加载中...');
            this.$http.post(secondaryApi.all, param).then((response) => {
                this.setItems(pageindex, response.data.data);
                $.weui.hideLoading();
                this.loadmore = false;
                if (response.data.data.length> 0 &&(pageindex + 1) * pagesize < response.data.data[0].total) {
                    pageindex++;
                } else {
                    this.loadFinish = true;
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
            this.loadFinish = false;
            this.curTab = cate;
            console.log('vshngher')
            this.$broadcast('scroll-reset', uuid)
            pageindex = 0;
            $.weui.loading('数据加载中...');
            this.$http.post(secondaryApi.all, {
                token,
                pagesize,
                pageindex,
                category: cate === '全部' ? undefined : cate
            }).then((response) => {
                $.weui.hideLoading();
                this.setCategory(pageindex, response.data.data);
                if (response.data.data.length> 0 &&(pageindex + 1) * pagesize < response.data.data[0].total) {
                    pageindex++;
                } else {
                    console.log(123)
                    this.loadFinish = true;
                     console.log(this.loadFinish)
                }
            });
        }
    }
}
</script>



