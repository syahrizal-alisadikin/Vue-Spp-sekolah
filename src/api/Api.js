//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "https://sekolah.izaldev.my.id/api",
});

export default Api;
