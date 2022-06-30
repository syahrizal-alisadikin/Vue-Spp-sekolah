<template>
  <ComponentHeader />
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <h5 class="text-center my-3">SELAMAT REGISTER BERHASIL</h5>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="table-responsive">
                  <table class="table table-striped table-bordered">
                    <thead class="thead-dark text-center">
                      <tr>
                        <th scope="col">NAMA</th>
                        <th scope="col">:</th>
                        <th scope="col">{{ siswa.name }}</th>
                      </tr>
                      <tr>
                        <th scope="col">EMAIL</th>
                        <th scope="col">:</th>
                        <th scope="col">{{ siswa.email }}</th>
                      </tr>
                      <tr>
                        <th scope="col">PHONE</th>
                        <th scope="col">:</th>
                        <th scope="col">{{ siswa.phone }}</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>

            <h5 class="text-center my-3">
              SILAHKAN HUBUNGI ADMIN UNTUK AKTIF AKUN ANDA
            </h5>
            <h5 class="text-center my-3">
              IBU ADMIN<br />
              0892472947
            </h5>
            <h5 class="text-center my-3">
              Email ADMIN<br />
              admin@gmail.com
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ComponentFooter />
</template>

<script>
import ComponentHeader from "@/components/Header";
import ComponentFooter from "@/components/Footer";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "RegisterSuccess",
  components: {
    ComponentHeader,
    ComponentFooter,
  },

  setup() {
    //store vuex
    const store = useStore();

    //mounted
    onMounted(() => {
      //panggil action "getUser" dari module "auth" vuex
      store.dispatch("auth/getSiswa");
    });

    //computed
    const siswa = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"
      return store.getters["auth/currentSiswa"];
    });

    //return a state and function
    return {
      store,
      siswa,
    };
  },
};
</script>
