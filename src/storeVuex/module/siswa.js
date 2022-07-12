//import global API
import Api from "../../api/Api";

const auth = {
  namespaced: true,

  //state
  state: {
     //define state friends
     friends: [],
     pagination: [],
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
  },

  //actions
  actions: {
    
  //action getFriend
  getFriend({ commit },{name}) {

    //define variable token
    const token = localStorage.getItem('access_token')

    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    Api.get('/friend?name='+ name)
    .then(response => {
        //commit ke mutation GET_ORDER
        commit('GET_FRIEND', response.data.data.data)
        commit('GET_PAGINATION', response.data.data)

    })

},
getPagination({ commit },{url}) {

  //define variable token
  const token = localStorage.getItem('access_token')
  console.log(url)
  Api.defaults.headers.common['Authorization'] = "Bearer " +token
  Api.get('/friend?page='+ url)
  .then(response => {
      //commit ke mutation GET_ORDER
      commit('GET_FRIEND', response.data.data.data)
      commit('GET_PAGINATION', response.data.data)

  })

},

  

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
  },
};
export default auth;
