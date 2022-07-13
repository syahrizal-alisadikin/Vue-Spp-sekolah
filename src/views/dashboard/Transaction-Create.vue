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
            <form @submit.prevent="registerTransaction">
              <div class="row">
                <div class="col-md-5">
                  <div class="mb-3">
                    <label class="form-label">Pilih Pembayaran</label>
                    <select
                      v-model="siswa.tagihan_id"
                      v-on:change="onChange()"
                      class="form-control"
                      required
                    >
                      <option value="">-- Pilih Pembayaran --</option>
                      <option
                        v-for="item in tagihan"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div
                    v-if="validation.tagihan_id"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.tagihan_id[0] }}
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nominal</label>
                    <input
                      type="text"
                      v-model="siswa.nominal"
                      class="form-control"
                      placeholder="Nominal"
                      readonly
                    />
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
import { useStore } from "vuex";
import Swal from "sweetalert2";

import { useRouter } from "vue-router";
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
      nominal: 0,
    });

    //validation state
    const validation = ref([]);
    //define state
    const tagihan = ref([]);
    // store vuex
    const store = useStore();

    const search = ref("");

    const router = useRouter();
    const rows = ref(5);

    onMounted(() => {
      axios
        .get("/api/tagihan")
        .then((response) => {
          tagihan.value = response.data.data;
        })
        .catch(() => {
          tagihan.value = [];
        });
    });
    //method onchange
    const onChange = () => {
      axios.get("/api/tagihan/" + siswa.tagihan_id).then((response) => {
        siswa.nominal = `${response.data.data.nominal}`;
      });
      // siswa.tagihan_id = e.target.value;
    };

    // Register Transaction
    const registerTransaction = () => {
      let tagihan_id = siswa.tagihan_id;
      let nominal = siswa.nominal;
      //panggil action "login" dari module "auth" di vuex
      store
        .dispatch("siswa/storeTransaction", {
          tagihan_id,
          nominal,
        })
        .then(() => {
          //redirect ke dashboard
          store.dispatch("siswa/getTransaction", {
            name: search.value ?? "",
            rows: rows.value,
          });
          router.push({ name: "transaction" });
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil dihapus!",
            icon: "success",
          });
        })
        .catch((error) => {
          //assign validaation message
          validation.value = error;
          // console.log(validation);
        });
    };

    //return object
    return {
      siswa,
      validation,
      tagihan,
      onChange,
      registerTransaction,
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
