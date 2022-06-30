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
                        <th scope="col">Syahrizal</th>
                      </tr>
                      <tr>
                        <th scope="col">EMAIL</th>
                        <th scope="col">:</th>
                        <th scope="col">Izal@Email.com</th>
                      </tr>
                      <tr>
                        <th scope="col">PHONE</th>
                        <th scope="col">:</th>
                        <th scope="col">089645624</th>
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
export default {
  name: "RegisterSuccess",
  components: {
    ComponentHeader,
    ComponentFooter,
  },
};
</script>
