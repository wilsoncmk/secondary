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
    import { setAticles } from '../../../vuex/index/action'
    import secondaryApi from '../../../schema/api/secondary';
    import secondaryItem from '../secondaryItem/secondaryItem.vue'
    export default {
        vuex: {
            actions: {
                setAticles
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
                alert(123);// eslint-disable-line
                this.$http.post(secondaryApi.update, {
                    token: window.localStorage.getItem('ecnu_token'),
                    id: this.data.id,
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '已出售'
                }).then((response) => {
                    this.getAll();
                })
            },
            getAll () {
                this.$http.post(secondaryApi.all, {
                    token: window.localStorage.getItem('ecnu_token'),
                    openid: window.localStorage.getItem('ecnu_openid'),
                    state: '未出售'
                }).then((response) => {
                    const res = response.data.data;
                    this.setAticles(0, res);
                }, (response) => {
                })
            }
        },
        created () {
            // console.log(this.articles)
        }
    }
</script>