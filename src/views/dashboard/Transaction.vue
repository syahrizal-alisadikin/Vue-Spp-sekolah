<template>
  <ComponentHeader />
  <div class="container-fluid my-4" id="dashboard">
    <div class="row">
      <div class="col-md-3 my-1">
        <ComponentSidebar />
      </div>
      <div class="col-md-9 my-1">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h5 class="font-weight-bold">
              <i class="fas fa-tachometer-alt"></i> DASHBOARD TRANSACTION
            </h5>
            <hr />
            Selamat Datang <strong>{{ user.name }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ComponentFooter />
</template>

<script>
import ComponentHeader from "@/components/Header";
import ComponentSidebar from "@/components/Sidebar.vue";
import ComponentFooter from "@/components/Footer";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "FriendComponent",

  components: {
    ComponentHeader,
    ComponentSidebar,
    ComponentFooter,
  },

  setup() {
    //store vuex
    const store = useStore();

    //mounted
    onMounted(() => {
      //panggil action "getSiswa" dari module "auth" vuex
      store.dispatch("auth/getSiswa");
    });

    //computed
    const user = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"
      return store.getters["auth/currentSiswa"];
    });

    //return a state and function
    return {
      store,
      user,
    };
  },
};
</script>

<style scoped>
/* height id dashboard */
#dashboard {
  height: calc(75vh - 100px);
}
</style>
