import { createStore } from 'vuex'

const state = {
    fcData: [],
    safeData:[]
}

const mutations = {
    setFCData(state, data) {
        state.fcData = Object.assign({}, JSON.parse(JSON.stringify(data)));
    },
    setSafeDataData(state, data) {
        state.safeData = Object.assign({}, JSON.parse(JSON.stringify(data)));
    }
};

export default createStore({
    state,
    mutations
})
