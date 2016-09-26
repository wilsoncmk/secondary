
<template>
       <div class="item-detail-wrapper ">
           <header class="bar bar-nav">
              <a class="icon icon-left pull-left" @click="goback()"></a>
              <a class="icon icon-refresh pull-right"></a>
              <h1 class="title">宝贝详情</h1>
            </header>
            <div class="user-info-wrapper border-bottom">
                <div class="price-wrapper">
                    <span class="cur-price">&yen;{{data.current_price}}</span>
                    <span class="origin-price">{{data.origin_price}}</span>
                </div>
                <div class="user-image"></div>
                <div class="user-name-wrapper">
                    <span class="user-name">{{data.nickname || 'XXX'}}</span>
                    <br/>
                    <span class="release-time">{{data.time_release | date}}</span>
                </div>
            </div>
            <div class="detail-wrapper">
                <span class="item-title">#{{data.title}}#</span>{{data.content}}
            </div>
            <div class="contact-wrapper">
            <div class="contact-item" v-if="data.qq">
                <label for="">QQ:</label>
                <span>{{data.qq}}</span>
            </div>
            <div class="contact-item" v-if="data.wechat">
                <label for="">微信:</label>
                <span>{{data.wechat}}</span>
            </div>
            <div class="contact-item" v-if="data.telephone">
                <label for="">手机:</label>
                <span>{{data.telephone}}</span>
            </div>
            </div>
            <div class="item-image-wrapper  ">
                <img v-for="url of data.imgurls"  v-bind:src="getPicStyle(url)" alt="">
            </div>
        </div>
</template>

<script>
    import { getPicUrl } from '../../../common/utils/image'
    import secondaryApi from '../../../schema/api/secondary';
    import './itemDetail.scss'
    export default {
        data () {
            return {
                data: {}
            };
        },
        created () {
            this.$http.post(secondaryApi.all, {
                token: window.localStorage.getItem('ecnu_token'),
                id: this.$route.params.itemId
            }).then((response) => {
                this.data = response.data.data[0]
            });
        },
        methods: {
            getPicStyle (url) {
                return getPicUrl(url);
            },
            goback () {
                this.$route.router.go({
                    name: 'index'
                });
            }
        }
    }
</script>