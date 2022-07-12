//import vuex
import { createStore } from "vuex";

//import module auth
import auth from "./module/auth";

// import module siswa
import siswa from "./module/siswa";

//create store vuex
export default createStore({
  modules: {
    auth, // <-- module auth
    siswa, // <-- module siswa
  },
});
