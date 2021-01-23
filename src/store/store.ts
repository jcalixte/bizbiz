import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'bizbiz'
})

export const store = createStore({
  state: {
    minDate: '',
    maxDate: '',
    resources: 1,
    productivity: 1,
    offDays: 1
  },
  mutations: {},
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin]
})
