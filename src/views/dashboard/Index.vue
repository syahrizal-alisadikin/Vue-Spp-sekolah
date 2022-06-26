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
              <i class="fas fa-tachometer-alt"></i> DASHBOARD
            </h5>
            <hr />
            Selamat Datang <strong>Izal</strong>
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
export default {
  name: "DashboardComponent",

  components: {
    ComponentHeader,
    ComponentSidebar,
    ComponentFooter,
  },
};
</script>
