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
<!--     <div class="weui_dialog_confirm" id="dlgDealFinished">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_bd">确定完成交易吗</div>
        <div class="weui_dialog_ft">
            <a href="#" class="weui_btn_dialog default">取消</a>
            <a href="#" class="weui_btn_dialog primary">确定</a>
        </div>
    </div> -->
<!-- </div> -->
    </div>
</template>

<script>
import progress from 'vue-progressbar/vue-progressbar.vue'
import store from '../vuex/index/store'
import './layout.scss'

export default {
    store: store,
    data () {
        return {
            curTab: 'index'
        }
    },
    components: {
        progress
    },
    created () {
        this.$progress.setHolder(this.vueProgress)
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
