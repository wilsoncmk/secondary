<template>
    <div class="">
        <router-view></router-view>
        <nav class="bar bar-tab">
            <a class="tab-item {{ curTab === 'index' ? 'active' : ''}}" @click="navRoute($event, 'index')">
                <span class="icon icon-home"></span>
                <span class="tab-label">首页</span>
            </a>
            <a class="tab-item {{ curTab === 'release' ? 'active' : ''}}" @click="navRoute($event, 'release')">
                <span class="icon icon-star"></span>
                <span class="tab-label">发布</span>
            </a>
            <a class="tab-item {{ curTab === 'my' ? 'active' : ''}}" @click="navRoute($event, 'my')">
                <span class="icon icon-me"></span>
                <span class="tab-label">我</span>
            </a>
        </nav>
    </div>
</template>

<script>
import store from '../vuex/index/store'
import './layout.scss'

export default {
    store: store,
    data () {
        return {
            curTab: 'index'
        }
    },
    created () {
        console.log('create app');
        const user = {};
        const query = document.location.search
        const reg = /\?user=(.*)&openid=(.*)/
        if (reg.test(query)) {
            const match = query.match(reg);
            user.token = match[1];
            user.openid = match[2];
            window.user = user;
            console.log(window.user)
        }
    },
    ready () {
    },
    methods: {
        navRoute (e, name) {
            this.$route.router.go({name: name})
            this.curTab = name
        }

    }
}
</script>
