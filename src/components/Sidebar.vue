<template>
  <ul class="list-group">
    <li class="list-group-item" aria-current="true">
      <router-link
        :to="{ name: 'dashboard' }"
        class="list-group-item text-decoration-none text-uppercase"
        :class="{ active: 'dashboard' === $route.name }"
        ><i class="fas fa-tachometer-alt"></i> Dashboard</router-link
      >
    </li>
    <li class="list-group-item">
      <router-link
        :to="{ name: 'transaction' }"
        :class="{
          active:
            'transaction' === $route.name ||
            'transaction-create' === $route.name,
        }"
        class="list-group-item text-decoration-none text-uppercase"
        ><i class="fas fa-dollar-sign"></i> Pembayaran</router-link
      >
    </li>
    <li class="list-group-item">
      <router-link
        :to="{ name: 'friend' }"
        class="list-group-item text-decoration-none text-uppercase"
        :class="{ active: 'friend' === $route.name }"
        ><i class="fas fa-users"></i> Teman Kelas</router-link
      >
    </li>
    <li class="list-group-item">
      <a
        @click="logout"
        style="cursor: pointer"
        class="list-group-item text-decoration-none text-dark text-uppercase"
        ><i class="fas fa-sign-out-alt"></i> Logout</a
      >
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SidebarComponent",
  setup() {
    //store vuex
    const store = useStore();

    //vue router
    const router = useRouter();

    //method logout
    function logout() {
      //panggil action "logout" di dalam module "auth"
      store.dispatch("auth/logout").then(() => {
        //jika berhasil, akan di arahkan ke route login
        router.push({
          name: "login",
        });
      });
    }

    //return a state and function
    return {
      store,
      router,
      logout,
    };
  },
};
</script>
