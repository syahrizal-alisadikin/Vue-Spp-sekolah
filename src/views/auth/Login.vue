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
            <h5 class="text-center my-3">LOGIN SISWA</h5>
            <form @submit.prevent="login">
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
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="register mt-3 text-center">
          <p>
            Belum punya akun ?
            <router-link :to="{ name: 'register' }"
              >Daftar Sekarang !</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <ComponentFooter />
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ComponentHeader from "@/components/Header";
import ComponentFooter from "@/components/Footer";
export default {
  name: "LoginComponent",
  components: {
    ComponentHeader,
    ComponentFooter,
  },
  setup() {
    //user state
    const siswa = reactive({
      email: "",
      password: "",
    });

    //validation state
    const validation = ref([]);

    // store vuex
    const store = useStore();

    //route
    const router = useRouter();

    //method login
    function login() {
      //define variable
      let email = siswa.email;
      let password = siswa.password;

      //panggil action "login" dari module "auth" di vuex
      store
        .dispatch("auth/login", {
          email,
          password,
        })
        .then(() => {
          //redirect ke dashboard
          router.push({ name: "dashboard" });
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
      login,
    };
  },
};
</script>
