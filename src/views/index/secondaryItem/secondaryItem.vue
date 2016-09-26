
<template>
       <div class="list-item-wrapper " @click="handleItemClicked(data.id)">
            <div class="user-info-wrapper  ">
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
            <div class="item-image-wrapper  ">
                <div class="item-image-inner-wrapper">
                    <div class="item-image" v-for="url in data.imgurls" v-bind:style="getPicStyle(url)">
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
            // console.log(this.data)
            // this.$covImg(this, this.data.img, cloudSrc => {
            //     this.cloudSrc = cloudSrc
            // })
        },
        methods: {
            getPicStyle (url) {
                return 'background-image:url(' + getPicUrl(url) + ')';
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