<template>
  <nav
    class="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
    style="border-top: 5px solid rgb(175, 140, 226); position: relative"
  >
    <div class="container-fluid">
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none text-white text-uppercase"
        ><i class="fa fa-graduation-cap" aria-hidden="true"></i> SMK
        INDONESIA</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link :to="{ name: 'post' }" class="nav-link"
              ><i class="fa fa-book-open" aria-hidden="true"></i>
              BERITA</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'event' }" class="nav-link"
              ><i class="fa fa-calendar" aria-hidden="true"></i>
              AGENDA</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'photo' }" class="nav-link"
              ><i class="fa fa-image" aria-hidden="true"></i>
              GALERI</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'video' }" class="nav-link"
              ><i class="fa fa-video" aria-hidden="true"></i> VIDEO</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'contact' }" class="nav-link"
              ><i class="fa fa-phone" aria-hidden="true"></i>
              KONTAK</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link
              :to="{ name: 'dashboard' }"
              class="text-decoration-none text-white text-uppercase"
              ><i class="fas fa-tachometer-alt"></i> Dashboard</router-link
            >
          </li>
          <li class="nav-item" v-else>
            <router-link
              :to="{ name: 'login' }"
              class="text-decoration-none text-white text-uppercase"
              ><i class="fas fa-sign-in-alt"></i> LOGIN</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "HeaderComponent",

  setup() {
    //store vuex
    const store = useStore();

    //computed
    const isLoggedIn = computed(() => {
      //get getters isLoggedIn dari module auth
      return store.getters["auth/isLoggedIn"];
    });

    return {
      store,
      isLoggedIn,
    };
  },
};
</script>
 <style scoped>
.navbar-toggler .navbar-toggler-icon {
  background-image: block !important;
}
</style>
