import { createStore } from 'vuex'

const state = {
    fcData: []
}

const mutations = {
    setFCData(state, data) {
        state.fcData = Object.assign({}, JSON.parse(JSON.stringify(data)));
    }
};

export default createStore({
    state,
    mutations
})
