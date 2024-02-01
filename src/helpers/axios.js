import axios from "axios";

axios.defaults.baseURL =
  "https://flypolygraph-server-production.up.railway.app/api/v1";
// axios.defaults.baseURL = "http://localhost:8080/api/v1";

export default axios;
