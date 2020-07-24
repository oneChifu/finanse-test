export default {
  namespaced: true,

  state: {
    data: []
  },

  getters: {
    data(state) {
      return state.data;
    },
  },

  mutations: {
    SET_PAYMETHODS(state, data) {
      state.data = data
    },
  },

  actions: {
    async getPaymethods({ commit }) {
      const data = [
        {
          id: 1,
          type: 'E-money',
          title: 'Qiwi Wallet', 
          fees: 1.5,
        },
        {
          id: 2,
          type: 'E-money',
          title: 'Skrill',
          fees:  2.5,
        },
        {
          id: 3,
          type: 'E-money',
          title: 'Payoneer', 
          fees: 5,
        },
        {
          id: 4,
          type: 'E-money',
          title: 'Payza', 
          fees: 2.5,
        },
        {
          id: 5,
          type: 'E-money',
          title: 'Yandex.Money', 
          fees: 2.5,
        },
        {
          id: 6,
          type: 'E-money',
          title: 'PayPal', 
          fees: 0.5,
        },
        {
          id: 7,
          type: 'Mobile Payments',
          title: 'Mobile 1', 
          fees: 1,
        },
        {
          id: 8,
          type: 'Mobile Payments',
          title: 'Mobile 2', 
          fees: 2,
        },
        {
          id: 9,
          type: 'Bank Cards',
          title: 'Bank Cards 1', 
          fees: 1,
        },
        {
          id: 10,
          type: 'Bank Cards',
          title: 'Bank Cards 2', 
          fees: 2,
        },
        {
          id: 11,
          type: 'Bank Transfers',
          title: 'Bank Transfers 1', 
          fees: 1,
        },
        {
          id: 12,
          type: 'Bank Transfers',
          title: 'Bank Transfers 2',
          fees: 1,
        },
        {
          id: 13,
          type: 'Terminals',
          title: 'Terminals 1',
          fees: 1,
        },
        {
          id: 14,
          type: 'Terminals',
          title: 'Terminals 2', 
          fees: 2,
        }
      ]

      commit('SET_PAYMETHODS', data)
    },
  }
};
