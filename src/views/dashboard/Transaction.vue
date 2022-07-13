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
            <form @submit.prevent="handleSearch">
              <div class="row mb-3">
                <div class="col-md-3 col-lg-1 mb-2">
                  <div class="form-group">
                    <select
                      name="rows"
                      class="form-select"
                      v-on:change="handleSearch"
                      v-model="rows"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-9"></div>
                <div class="col-md-6 col-lg-2">
                  <div class="form-group">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      v-model="search"
                      v-on:keyup="handleSearch"
                      placeholder="Search Pembayaran..."
                    />
                  </div>
                </div>

                <!-- <div class="col-md-1">
                  <div class="form-group">
                    <button
                      class="btn btn-primary input-group-text"
                      type="submit"
                    >
                      <i class="fa fa-search"></i> SEARCH
                    </button>
                  </div>
                </div> -->
              </div>
            </form>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead class="table-primary">
                  <tr class="text-center">
                    <th scope="col">Pembayaran</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tanggal Bayar</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody v-if="transactions.length > 0" class="text-center">
                  <tr v-for="transaction in transactions" :key="transaction.id">
                    <th>
                      {{ transaction.tagihan.name ?? "Belum ada Tagihan" }}
                    </th>
                    <th>
                      Rp
                      {{
                        moneyFormat(transaction.nominal) ?? "Belum ada Nominal"
                      }}
                    </th>
                    <th>{{ transaction.status ?? "Belum ada Status" }}</th>
                    <th>{{ transaction.tanggal_bayar ?? "-" }}</th>
                    <th v-if="transaction.status == 'PENDING'">
                      <button
                        @click="payment(transaction.midtrans_id)"
                        class="btn btn-sm btn-primary"
                      >
                        Bayar
                      </button>
                    </th>
                    <th v-else-if="transaction.status == 'SUCCESS'">
                      <button type="button" class="btn btn-sm btn-success">
                        Lunas
                      </button>
                    </th>
                    <th v-else>
                      <button type="button" class="btn btn-sm btn-danger">
                        Belum Lunas
                      </button>
                    </th>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th colspan="5" class="text-center">tidak ada data</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- start Pagination -->
            <nav>
              <ul :class="`pagination justify-content-end mb-0`">
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
                    style="cursor: pointer"
                    :class="`page-link ${
                      link.active ? 'bg-primary text-white' : ''
                    }`"
                    v-html="link.label"
                  >
                  </a>
                </li>
              </ul>
            </nav>
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

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "TransactionComponent",

  components: {
    ComponentHeader,
    ComponentSidebar,
    ComponentFooter,
  },

  setup() {
    //store vuex
    const store = useStore();
    const search = ref("");

    const router = useRouter();
    const rows = ref(5);

    //mounted
    onMounted(() => {
      //panggil action "getSiswa" dari module "auth" vuex
      store.dispatch("siswa/getTransaction", {
        name: search.value ?? "",
        rows: rows.value,
      });
    });

    //computed
    const transactions = computed(() => {
      return store.getters["siswa/getTransactions"];
    });

    // Pagination
    const pagination = computed(() => {
      //panggil getters dengan nama "currentUser" dari module "auth"
      return store.getters["siswa/getPagination"];
    });

    const handleSearch = () => {
      store.dispatch(
        "siswa/getTransaction",
        // params
        {
          name: search.value,
          rows: rows.value,
        }
      );
    };

    const goToPage = (url) => {
      store.dispatch("siswa/getPaginationTransaction", {
        url: url,
        rows: rows.value,
        name: search.value,
      });
    };

    //function payment "Midtrans"
    function payment(midtrans_id) {
      window.snap.pay(midtrans_id, {
        onSuccess: function () {
          router.push({
            name: "transaction",
          });
        },
        onPending: function () {
          router.push({
            name: "transaction",
          });
        },
        onError: function () {
          router.push({
            name: "transaction",
          });
        },
      });
    }
    //return a state and function
    return {
      store,
      transactions,
      search,
      rows,
      pagination,
      handleSearch,
      goToPage,
      payment,
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
