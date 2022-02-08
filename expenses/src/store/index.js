import Vuex from 'vuex'

export default new Vuex.Store({
    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = []
                    for (let i = 1; i < 101; i++) {
                        items.push({
                            date: Date.now(),
                            category: 'Food',
                            id: i,
                            value: i
                        })
                    }
                    resolve(items)
                }, 1500)
            }).then(res => {
                commit('setPaymentsListData', res)
            })
        },

        loadCategories({ commit }) {
            return new Promise((resolve) => {
                // имитируем работу с сетью
                setTimeout(() => {
                    resolve(['Food', 'Transport', 'Education', 'Entertainment', 'Sport'])
                }, 1000)
            })
                .then(res => {
                    // запускаем изменение состояния через commit
                    commit('setCategories', res)
                })
        },

    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload
        },
        addDataToPaymentsList(state, data) {
            state.paymentsList.push(data)
        },
        setCategories(state, payload) {
            state.categoryList = payload
        },
    },
    state: {
        paymentsList: [],
        categoryList: []
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((acc, cur) => acc + cur.value, 0)
        }
    },
    modules: {
    }
})
