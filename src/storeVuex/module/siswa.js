//import global API
import Api from "../../api/Api";

const auth = {
  namespaced: true,

  //state
  state: {
     //define state friends
     friends: [],
     pagination: [],
     transactions: [],
  },

  // Mutations
  mutations: {
    //GET FRIEND
    GET_FRIEND(state, friends) {
        state.friends = friends // <-- assign state friends dari hasil response
    },
    GET_PAGINATION(state, pagination) {
        state.pagination = pagination // <-- assign state friends dari hasil response
    },

    GET_TRANSACTION(state, transactions) {
      state.transactions = transactions // <-- assign state friends dari hasil response
  },
  },

  //actions
  actions: {
    
    //action getFriend
    getFriend({ commit },{name,rows}) {

        //define variable token
        const token = localStorage.getItem('access_token')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.get('/friend?name='+ name +'&rows='+ rows)
        .then(response => {
            //commit ke mutation GET_ORDER
            commit('GET_FRIEND', response.data.data.data)
            commit('GET_PAGINATION', response.data.data)

        })

    },
    getPagination({ commit },{url,rows,name}) {

      //define variable token
      const token = localStorage.getItem('access_token')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      Api.get('/friend?page='+ url +'&rows=' + rows + '&name=' + name)
      .then(response => {
          //commit ke mutation GET_ORDER
          commit('GET_FRIEND', response.data.data.data)
          commit('GET_PAGINATION', response.data.data)

      })

    },

    //action getTransaction
    getTransaction({ commit },{name,rows}) {

      //define variable token
      const token = localStorage.getItem('access_token')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      Api.get('/transactions?name='+ name +'&rows='+ rows)
      .then(response => {
          //commit ke mutation GET_ORDER
          commit('GET_TRANSACTION', response.data.data.data)
          commit('GET_PAGINATION', response.data.data)

      })

    },

    getPaginationTransaction({ commit },{url,rows,name}) {

      //define variable token
      const token = localStorage.getItem('access_token')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      Api.get('/transactions?page='+ url +'&rows=' + rows + '&name=' + name)
      .then(response => {
          //commit ke mutation GET_ORDER
          commit('GET_TRANSACTION', response.data.data.data)
          commit('GET_PAGINATION', response.data.data)

      })

    },

    // Delete Transaction
    deleteTransaction({ commit },{id,rows,name}) {
        
        //define variable token
        const token = localStorage.getItem('access_token')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.delete('/transactions/'+ id)
        .then(() => {
            //commit ke mutation GET_ORDER

            // Setelah di hapus, hit kembali datanya
            Api.get('/transactions?name='+ name +'&rows='+ rows)
            .then(response => {
                //commit ke mutation GET_ORDER
                commit('GET_TRANSACTION', response.data.data.data)
                commit('GET_PAGINATION', response.data.data)

            })

            
  
        })
  
      },

      // Craete Transaction
      storeTransaction({ commit }, siswa) {
        //define variable token
        const token = localStorage.getItem('access_token')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        //define callback promise
        return new Promise((resolve, reject) => {

            //send data ke server
            Api.post('/tagihan/store', {

                    //data yang dikirim ke serve untuk proses register
                    tagihan_id: siswa.tagihan_id,
                    nominal: siswa.nominal,
                    

                })

                .then(response => {

                  console.log(response.data.data)

                    //commit auth success ke mutation
                    commit('GET_TRANSACTION', response.data.data.data)
                    commit('GET_PAGINATION', response.data.data)

                    //resolve ke component dengan hasil response
                    resolve(response)

                }).catch(error => {
                  console.log(error)
                    //jika gagal, remove localStorage dengan key token
                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })

        })
    }

  },

  //getters
  getters: {
     //getter getFriend
     getFriend(state) {
        return state.friends
    },

    getPagination(state) {
        return state.pagination
    },

    getTransactions(state) {
      return state.transactions
  },
  },
};
export default auth;
