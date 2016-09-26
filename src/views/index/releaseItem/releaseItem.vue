<template>
    <div class="m-release-wrapper">
        <header class="bar bar-nav">
            <h1 class='title'>发布信息</h1>
        </header>
        <div>
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-name"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <input type="text" placeholder="标题" v-model="title">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="align-top">
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-comment"></i></div>
                            <div class="item-inner">
                                <div class="item-input">
                                    <textarea placeholder="描述下您的宝贝" v-model="content"></textarea>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        <div class="weui_cells_title">上传</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui_uploader">
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">图片上传</div>
                            <div class="weui_cell_ft">{{files.length}}/{{maxNumberOfimages}}</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <ul class="weui_uploader_files">
                                <li class="weui_uploader_file" v-for="image in preImages"><img v-bind:src="image"/></li>
<!--                                 <li class="weui_uploader_file" style="background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)"></li> -->
                              <!--   <li class="weui_uploader_file weui_uploader_status" style="background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)">
                                    <div class="weui_uploader_status_content">
                                        <i class="weui_icon_warn"></i>
                                    </div>
                                </li>
                                <li class="weui_uploader_file weui_uploader_status" style="background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)">
                                    <div class="weui_uploader_status_content">50%</div>
                                </li> -->
                            </ul>
                            <div class="weui_uploader_input_wrp" v-if="files.length !== maxNumberOfimages">
                                <input class="weui_uploader_input" type="file" 
                                    accept="image/jpg,image/jpeg,image/png,image/gif"
                                    v-on:change="handleOnChangeImage"
                                    multiple />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-block">
            <ul>
                <!-- Text inputs -->
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-password"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">发布价格</div>
                            <div class="item-input">
                                <input type="number" placeholder="发布价格" v-model="current_price">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-password"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">买入价格</div>
                            <div class="item-input">
                                <input type="number" placeholder="发布价格" v-model="origin_price">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-password"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">联系方式</div>
                            <div class="item-input">
                                <input type="number" placeholder="请留下你得联系方式" class="" v-model="telephone">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-gender"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">分类</div>
                            <div class="item-input">
                                <select v-model="category">
                                    <option selected value="自行车">自行车</option>
                                    <option value="书籍">书籍</option>
                                    <option value="生活用品">生活用品</option>
                                    <option value="数码">数码</option>
                                    <option value="服装">服装</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="release-btn">
            <a href="#" class="weui_btn weui_btn_primary" @click="releaseItem()">发布</a>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import './releaseItem.scss'
    import secondaryApi from '../../../schema/api/secondary';
    export default {
        data () {
            return {
                title: 'bike',
                telephone: '123',
                price: '11',
                preImages: [],
                numberOfimages: 0,
                maxNumberOfimages: 3,
                files: []
            }
        },
        created () {
            // console.log(this.data)
            // this.$covImg(this, this.img, cloudSrc => {
            //     this.cloudSrc = cloudSrc
            // })
        },
        methods: {
            releaseItem () {
                const _vue = this;
                const param = {
                    current_price: this.current_price,
                    origin_price: this.origin_price,
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    telephone: this.telephone,
                    token: window.localStorage.getItem('ecnu_token')
                }
                _vue.$http.post(secondaryApi.new, param).then((response) => {
                    if (window.localStorage) {
                        window.localStorage.setItem('ecnu_openid', response.data.data.openid);
                        window.localStorage.setItem('ecnu_id', response.data.data.id);
                    }
                    if (this.files) {
                        this.releaseImage();
                    } else {
                        this.$route.router.go({name: 'index'})
                    }
                  // success callback
                }, (response) => {
                  // error callback
                });
            },
            releaseImage () {
                const formData = new FormData();// eslint-disable-line
                _.forEach(this.files, (f, i) => {
                    formData.append('file' + i, f);
                })
                // formData.append('files', this.files);
                formData.append('token', window.localStorage.getItem('ecnu_token'));
                formData.append('id', window.localStorage.getItem('ecnu_id'));
                formData.append('openid', window.localStorage.getItem('ecnu_openid'));
                this.$http.post(secondaryApi.upload, formData).then((response) => {
                    console.log(response.data.data)
                    this.$route.router.go({name: 'index'})
                  // success callback
                }, (response) => {
                  // error callback
                });
            },
            handleOnChangeImage (e) {
                _.forEach(e.target.files, (f) => {
                    this.files.push(f);
                    this.readAndPreview(f);
                    if (this.files.length === this.maxNumberOfimages) {
                        return false
                    }
                });
            },
            readAndPreview (file) {
                const reader = new FileReader();// eslint-disable-line
                reader.onloadend = () => {
                    const image = new Image();// eslint-disable-line
                    image.src = reader.result;
                    this.preImages.push(reader.result);
                    console.log(this.preImages)
                };
                reader.readAsDataURL(file);
            }

        }
    }
</script>