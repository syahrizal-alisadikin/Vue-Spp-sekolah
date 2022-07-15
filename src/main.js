import { createApp } from "vue";
import App from "./App.vue";

//import router
import router from "./router";

//import store vuex
import storeVx from "./storeVuex";
import ArgonDashboard from "./argon-dashboard";

const app = createApp(App);

app.use(ArgonDashboard);
app.use(storeVx);
app.use(router);

//define mixins for global function
app.mixin({

    methods: {

        //money thousands
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
            thousands   = reverse.match(/\d{1,3}/g)
            thousands   = thousands.join('.').split('').reverse().join('')
            return thousands
        },

       

    }
})
app.mount("#app");
