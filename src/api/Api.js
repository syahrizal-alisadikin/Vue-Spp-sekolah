//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "http://izaldev.my.id/api",
});

export default Api;
