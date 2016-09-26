import Vue from 'vue'
import Vuex from 'vuex'
import {ACTION_TYPE} from './action'

Vue.use(Vuex)

const state = {
    lists: [],
    myLists: []
}

const mutations = {
    [ACTION_TYPE.SET_ITEMS] (state, index, arr) {
        state.lists.push({
            index,
            list: arr
        })
    },
    [ACTION_TYPE.SET_CATEGORY] (state, index, arr) {
        state.lists = [];
        state.lists.push({
            index,
            list: arr
        })
    },
    [ACTION_TYPE.SET_MY_ITEMS] (state, index, arr) {
        state.myLists.push({
            index,
            list: arr
        })
    },
    [ACTION_TYPE.SET_MY_CATEGORY] (state, index, arr) {
        state.myLists = [];
        state.myLists.push({
            index,
            list: arr
        })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
