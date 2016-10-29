import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true
})

router.map({
    '/': {
        name: 'index',
        component: (resolve) => {
            require(['../views/index/secondaryList/secondaryList.vue'], resolve)
        }
    },
    '/wx/secondary/public/index': {
        name: 'index',
        component: (resolve) => {
            require(['../views/index/secondaryList/secondaryList.vue'], resolve)
        }
    },
    '/detail/:itemId': {
        name: 'detail',
        component: (resolve) => {
            require(['../views/index/itemDetail/itemDetail.vue'], resolve)
        }
    },
    '/release': {
        name: 'release',
        component: (resolve) => {
            require(['../views/index/releaseItem/releaseItem.vue'], resolve)
        }
    },
    '/my': {
        name: 'my',
        component: (resolve) => {
            require(['../views/index/my/my.vue'], resolve)
        }
    }
})

export default router
