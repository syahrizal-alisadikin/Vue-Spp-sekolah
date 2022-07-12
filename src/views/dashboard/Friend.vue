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
              <i class="fas fa-tachometer-alt"></i> DASHBOARD FRIEND
            </h5>
            <hr />
            <form @submit.prevent="handleSearch">
              <div class="row mb-3">
                <div class="col-md-6 col-lg-4">
                  <div class="form-group">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      v-model="search"
                      placeholder="Cari berdasarkan Nama"
                    />
                  </div>
                </div>

                <div class="col-md-1">
                  <div class="form-group">
                    <button
                      class="btn btn-primary input-group-text"
                      type="submit"
                    >
                      <i class="fa fa-search"></i> SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nisn</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">ALAMAT</th>
                  </tr>
                </thead>
                <tbody v-if="friends.length > 0">
                  <tr v-for="friend in friends" :key="friend.id">
                    <th>{{ friend.nisn ?? "Belum ada Nisn" }}</th>
                    <th>{{ friend.name ?? "Belum ada Name" }}</th>
                    <th>{{ friend.email ?? "Belum ada Email" }}</th>
                    <th>{{ friend.phone ?? "Belum ada Phone" }}</th>
                    <th>{{ friend.alamat ?? "Belum ada alamat" }}</th>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th colspan="5" class="text-center">tidak ada data</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav>
              <ul :class="`pagination justify-content-center mb-0`">
                <li
                  :class="[
                    'page-item',
                    link.url == null ? 'disabled' : '',
                    link.active ? 'active' : '',
                  ]"
                  v-for="(link, index) in pagination.links"
                  :key="index"
                >
                  <a
                    v-on:click="goToPage(link.label)"
                    :class="`page-link ${
                      link.active ? 'bg-primary text-white' : ''
                    }`"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>
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
// import Pagination from "@/components/Pagination";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "FriendComponent",

  components: {
    ComponentHeader,
    ComponentSidebar,
    ComponentFooter,
    // Pagination,
  },

  setup() {
    //store vuex

    const store = useStore();
    const search = ref("");
    //mounted
    onMounted(() => {
      //panggil action "getSiswa" dari module "auth" vuex
      store.dispatch("siswa/getFriend", { name: search.value ?? "" });
    });

    //computed
    let friends = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"

      return store.getters["siswa/getFriend"];
    });

    const pagination = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"
      return store.getters["siswa/getPagination"];
    });

    const goToPage = (url) => {
      store.dispatch("siswa/getPagination", { url: url });
    };

    const handleSearch = () => {
      store.dispatch(
        "siswa/getFriend",
        // params
        { name: search.value }
      );
    };

    //return a state and function
    return {
      store,
      friends,
      pagination,
      search,
      handleSearch,
      goToPage,
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


