//import global API
import Api from "../../api/Api";

const auth = {
  namespaced: true,

  //state
  state: {
    //state untuk token, pakai localStorage, untuk menyimpan informasi tentang token JWT
    access_token: localStorage.getItem("access_token") || "",

    //state user, pakai localStorage, untuk menyimpan data user yang sedang login
    siswa: JSON.parse(localStorage.getItem("siswa")) || {},
  },

  // Mutations
  mutations: {
    //update state token dan state siswa dari hasil response
    AUTH_SUCCESS(state, access_token, siswa) {
      state.access_token = access_token; // <-- assign state token dengan response token
      state.siswa = siswa; // <-- assign state siswa dengan response data siswa
    },

    //update state siswa dari hasil response register / login
    GET_SISWA(state, siswa) {
      state.siswa = siswa; // <-- assign state user dengan response data user
    },

    //fungsi logout
    AUTH_LOGOUT(state) {
      state.access_token = ""; // <-- set state token ke empty
      state.siswa = {}; // <-- set state siswa ke empty array
    },
  },

  //actions
  actions: {
    //action login
    login({ commit }, siswa) {
      //define callback promise
      return new Promise((resolve, reject) => {
        Api.post("/login", {
          //data yang dikirim ke server
          email: siswa.email,
          password: siswa.password,
        })

          .then((response) => {
            //define variable dengan isi hasil response dari server
            console.log(response.data.data);
            const access_token = response.data.data.access_token;
            const siswa = response.data.data.user;

            //set localStorage untuk menyimpan token dan data user
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("siswa", JSON.stringify(siswa));

            //set default header axios dengan token
            Api.defaults.headers.common["Authorization"] =
              "Bearer " + access_token;

            //commit auth success ke mutation
            commit("AUTH_SUCCESS", access_token, siswa);

            //commit get siswa ke mutation
            commit("GET_SISWA", siswa);

            //resolve ke component dengan hasil response
            resolve(response);
          })
          .catch((error) => {
            //jika gagal, remove localStorage dengan key token
            localStorage.removeItem("access_token");

            //reject ke component dengan hasil response
            reject(error.response.data);
          });
      });
    },
    //action login
    register({ commit }, siswa) {
      //define callback promise
      return new Promise((resolve, reject) => {
        Api.post("/register", {
          //data yang dikirim ke server
          name: siswa.name,
          email: siswa.email,
          phone: siswa.phone,
          password: siswa.password,
          jenis_kelamin: siswa.jenis_kelamin,
          alamat: siswa.alamat,
          password_confirmation: siswa.password_confirmation,
          kelas_id: siswa.kelas_id,
        })

          .then((response) => {
            //define variable dengan isi hasil response dari server
            const access_token = response.data.data.access_token;
            const siswa = response.data.data.user;

            //set localStorage untuk menyimpan token dan data user
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("siswa", JSON.stringify(siswa));

            //set default header axios dengan token
            Api.defaults.headers.common["Authorization"] =
              "Bearer " + access_token;

            //commit auth success ke mutation
            commit("AUTH_SUCCESS", access_token, siswa);

          
            resolve(response);
          })
          .catch((error) => {
            //jika gagal, remove localStorage dengan key token
            localStorage.removeItem("access_token");

            //reject ke component dengan hasil response
            reject(error.response.data);
          });
      });
    },

    //action getSiswa
    getSiswa({ commit }) {

      //ambil data token dari localStorage
      const access_token = localStorage.getItem('access_token')

      Api.defaults.headers.common['Authorization'] = "Bearer " +access_token
      Api.get('/user')
      .then(response => {
          // console.log(response.data);
          //commit ke mutatuin GET_SISWA dengan hasil response
          commit('GET_SISWA', response.data)

      })
  },

    //action logout
    logout({ commit }) {
      //define callback promise
      return new Promise((resolve) => {
        //commit ke mutation AUTH_LOGOUT
        commit("AUTH_LOGOUT");

        //remove value dari localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("siswa");

        //delete header axios
        delete Api.defaults.headers.common["Authorization"];

        //return resolve ke component
        resolve();
      });
    },
  },

  //getters
  getters: {
    //get current user
    currentSiswa(state) {
      return state.siswa; // <-- return dengan data user
    },

    //loggedIn
    isLoggedIn(state) {
      return state.access_token; // return dengan data token
    },
  },
};
export default auth;
