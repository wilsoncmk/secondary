
<template>
        <section class="secondary-filter-wrapper">
            <div class="selected-wrapper border-bottom" @click="selectedOptionClicked()">
                <span>{{selectedOption.text}}</span>
            </div>
            <div class="options-wrapper {{ !showOptions ? 'hide' : ''}}">
                <div 
                    class="option border-bottom" v-for="opt of options"
                    @click="changeOption(opt)"
                    >
                    {{opt.value}}</div>
            </div>
        </section>

</template>

<script>
    import './secondaryListFilter.scss'
    export default {
        props: {
            optionchanged: {
                type: Function
            }
        },
        data () {
            return {
                options: [
                    {
                        value: '全部',
                        text: '全部'
                    },
                    {
                        value: '自行车',
                        text: '自行车'
                    },
                    {
                        value: '书籍',
                        text: '书籍'
                    },
                    {
                        value: '数码',
                        text: '数码'
                    },
                    {
                        value: '服装',
                        text: '服装'
                    },
                    {
                        value: '生活用品',
                        text: '生活用品'
                    }
                ],
                selectedOption: {
                    value: '全部',
                    text: '全部'
                },
                showOptions: false
            }
        },
        created () {
            // this.$covImg(this, this.data.img, cloudSrc => {
            //     this.cloudSrc = cloudSrc
            // })
        },
        methods: {
            changeOption (opt) {
                this.selectedOption = opt;
                this.showOptions = !this.showOptions;
                this.optionchanged(opt.value);
            },
            selectedOptionClicked () {
                this.showOptions = !this.showOptions;
            }
        }
    }
</script>