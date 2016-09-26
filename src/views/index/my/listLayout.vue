<style>
    .zhi-list {
        position: relative;
        padding: 0;
        padding-top: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #ECECEC;
    }
    .list-date {
        position: absolute;
        font-size: 2rem;
        text-align: center;
        top: 2rem;
        left: 1rem;
        color: #b2bac2;
        font-weight: 500;
    }
</style>

<template>
    <section class="secondary-item-list">
        <my-item v-for="data in list" :data="data"></my-item>  
    </section>
</template>

<script>
    import myItem from './myItem.vue'
    export default {
        props: {
            'list': {
                type: Array,
                required: true
            }
        },
        components: {
            myItem
        }
    }
</script>