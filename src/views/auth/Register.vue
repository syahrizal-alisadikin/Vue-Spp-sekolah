<template>
  <ComponentHeader />
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div
          v-if="validation.message"
          class="mt-2 alert alert-danger text-center"
        >
          {{ validation.message }}
        </div>
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <h5 class="text-center my-3">REGISTER SISWA</h5>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label class="form-label">Nama</label>
                <input
                  type="text"
                  v-model="siswa.name"
                  class="form-control"
                  placeholder="Nama Siswa"
                />
              </div>
              <div v-if="validation.name" class="mt-2 alert alert-danger">
                {{ validation.name[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input
                  type="tel"
                  v-model="siswa.phone"
                  class="form-control"
                  placeholder="Phone Number"
                />
              </div>
              <div v-if="validation.phone" class="mt-2 alert alert-danger">
                {{ validation.phone[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input
                  type="email"
                  v-model="siswa.email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div v-if="validation.email" class="mt-2 alert alert-danger">
                {{ validation.email[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  v-model="siswa.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div v-if="validation.password" class="mt-2 alert alert-danger">
                {{ validation.password[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Password Confirmation</label>
                <input
                  type="password"
                  v-model="siswa.password_confirmation"
                  class="form-control"
                  placeholder="Password Confirmation"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Kelas</label>
                <select v-model="siswa.kelas_id" class="form-control">
                  <option value="">-- Pilih Kelas --</option>
                  <option v-for="kela in kelas" :key="kela.id" :value="kela.id">
                    {{ kela.name }}
                  </option>
                </select>
              </div>
              <div v-if="validation.kelas_id" class="mt-2 alert alert-danger">
                {{ validation.kelas_id[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Jenis Kelamin</label>
                <select v-model="siswa.jenis_kelamin" class="form-control">
                  <option value="laki-laki" selected>LAKI-LAKI</option>
                  <option value="perempuan">PEREMPUAN</option>
                </select>
              </div>
              <div
                v-if="validation.jenis_kelamin"
                class="mt-2 alert alert-danger"
              >
                {{ validation.jenis_kelamin[0] }}
              </div>
              <div class="mb-3">
                <label class="form-label">Alamat</label>
                <textarea
                  v-model="siswa.alamat"
                  id=""
                  cols="30"
                  class="form-control"
                  placeholder="Masukan Alamat..."
                  rows="5"
                ></textarea>
              </div>
              <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                {{ validation.alamat[0] }}
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label mb-1" for="exampleCheck1"
                  >Ingatkan Saya</label
                >
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-block">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="register mt-3 text-center">
          <p>
            Sudah punya akun ?
            <router-link :to="{ name: 'login' }">Login Sekarang !</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <ComponentFooter />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//import axios
import axios from "axios";
import ComponentHeader from "@/components/Header";
import ComponentFooter from "@/components/Footer";
export default {
  name: "RegisterComponent",
  components: {
    ComponentHeader,
    ComponentFooter,
  },
  setup() {
    //user state
    const siswa = reactive({
      name: "",
      email: "",
      phone: "",
      password: "",
      jenis_kelamin: "",
      alamat: "",
      password_confirmation: "",
      kelas_id: "",
    });

    //validation state
    const validation = ref([]);
    //define state
    const kelas = ref([]);
    // store vuex
    const store = useStore();

    //route
    const router = useRouter();

    onMounted(() => {
      axios
        .get("/api/kelas")
        .then((response) => {
          console.log(response.data.data[0]);
          kelas.value = response.data.data[0];
        })
        .catch(() => {
          kelas.value = [];
        });
    });
    //method register
    function register() {
      //define variable
      let name = siswa.name;
      let email = siswa.email;
      let phone = siswa.phone;
      let password = siswa.password;
      let jenis_kelamin = siswa.jenis_kelamin;
      let alamat = siswa.alamat;
      let password_confirmation = siswa.password_confirmation;
      let kelas_id = siswa.kelas_id;

      //panggil action "login" dari module "auth" di vuex
      store
        .dispatch("auth/register", {
          name,
          email,
          phone,
          password,
          jenis_kelamin,
          alamat,
          password_confirmation,
          kelas_id,
        })
        .then(() => {
          //redirect ke dashboard
          router.push({ name: "register_success" });
        })
        .catch((error) => {
          //assign validaation message
          validation.value = error;
          // console.log(validation);
        });
    }

    //return object
    return {
      siswa,
      validation,
      register,
      kelas,
    };
  },
};
</script>
