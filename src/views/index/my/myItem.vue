<template>
    <div class="my-item-wrapper">
        <secondary-item :data="data"></secondary-item>
        <div class="status-wrapper">
            <div class="status-unstaled" v-if="data.state==='未出售'" @click="dealFinished()"><span>完成交易</span></div>
            <div class="status-staled" v-if="data.state==='已出售'"><span>已出售</span></div>
        </div>  
    </div>
</template>
<script>
    import './myItem.scss';
    import { setMyCategory } from '../../../vuex/index/action'
    import secondaryApi from '../../../schema/api/secondary';
    import secondaryItem from '../secondaryItem/secondaryItem.vue'
    import user from '../../../common/utils/user';
    export default {
        vuex: {
            actions: {
                setMyCategory
            }
        },
        props: {
            'data': {
                type: Object,
                required: true
            }
        },
        components: {
            secondaryItem
        },
        methods: {
            dealFinished () {
                $.weui.loading('数据加载中...');
                this.$http.post(secondaryApi.update, {
                    token: user.token,
                    id: this.data.id,
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '已出售'
                }).then((response) => {
                    $.weui.hideLoading();
                    this.getAll();
                })
            },
            getAll () {
                this.$http.post(secondaryApi.all, {
                    token: user.token,
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '未出售'
                }).then((response) => {
                    const res = response.data.data;
                    this.setMyCategory(0, res);
                }, (response) => {
                })
            }
        },
        created () {
            // console.log(this.articles)
        }
    }
</script>