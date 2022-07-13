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
              <i class="fas fa-tachometer-alt"></i> DASHBOARD TRANSACTION CREATE
            </h5>
            <hr />
            <form @submit.prevent="register">
              <div class="row">
                <div class="col-md-5">
                  <div class="mb-3">
                    <label class="form-label">Pilih Pembayaran</label>
                    <select v-model="siswa.tagihan_id" class="form-control">
                      <option value="">-- Pilih Pembayaran --</option>
                    </select>
                  </div>
                  <div
                    v-if="validation.tagihan_id"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.tagihan_id[0] }}
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary btn-block">
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <!-- end Pagination -->
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
import { ref, reactive, onMounted } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
//import axios
import axios from "axios";
export default {
  name: "TransactionCreateComponent",

  components: {
    ComponentHeader,
    ComponentSidebar,
    ComponentFooter,
  },

  setup() {
    //user state
    const siswa = reactive({
      tagihan_id: "",
    });

    //validation state
    const validation = ref([]);
    //define state
    const tagihan = ref([]);
    // store vuex
    // const store = useStore();

    // //route
    // const router = useRouter();

    onMounted(() => {
      axios
        .get("/api/tagihan")
        .then((response) => {
          console.log(response.data.data[0]);
          // kelas.value = response.data.data[0];
        })
        .catch(() => {
          tagihan.value = [];
        });
    });
    //method register

    //return object
    return {
      siswa,
      validation,
      tagihan,
    };
  },
};
</script>

<style scoped>
/* height id dashboard */
#dashboard {
  /* height: calc(100vh - 100px); */
}
</style>
