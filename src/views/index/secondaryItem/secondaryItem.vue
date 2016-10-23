
<template>
       <div class="list-item-wrapper " @click="handleItemClicked(data.id)">
            <div class="user-info-wrapper  ">
                <div class="price-wrapper">
                    <span class="cur-price">&yen;{{data.current_price}}</span>
                    <span class="origin-price">{{data.origin_price}}</span>
                </div>
                <div class="user-image" v-bind:style="getHeadImage(data.headimgurl)"></div>
                <div class="user-name-wrapper">
                    <span class="user-name">{{data.nickname}}</span>
                    <span v-bind:class="{'male' : data.sex == 1,'female' : data.sex != 1}"> {{data.sex == 1 ? '♂' : '♀'}}</span>
                    <br/>
                    <span class="release-time">{{data.time_release | date}}</span>
                </div>
            </div>
            <div class="item-image-wrapper" v-if="data.imgurls.length > 0">
                <div class="item-image-inner-wrapper">
                    <div class="item-image" v-for="url in data.imgurls" v-bind:style="getPicStyle(url)" >
                    </div>
                </div>
            </div>
            <div class="detail-wrapper">
                <span class="item-title">#{{data.title}}#</span>{{data.content}}
            </div>
        </div>
</template>

<script>
    import { getPicUrl } from '../../../common/utils/image'
    import './secondaryItem.scss'
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        created () {
        },
        methods: {
            getPicStyle (url) {
                return 'background-image:url(' + getPicUrl(url) + ')';
            },
            getHeadImage (url) {
                return `background-image:url(${url})`;
            },
            handleItemClicked (itemId) {
                this.$route.router.go({
                    name: 'detail',
                    params: {
                        itemId
                    }
                });
            }
        }
    }
</script>