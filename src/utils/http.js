import axios from "axios";
import Nprogress from "nprogress";
import { Notify, Toast } from "vant";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1500,
  timeoutErrorMessage: "网络错误，请刷新重试",
});
request.interceptors.request.use(
  (config) => {
    Nprogress.start();
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.code) {
        Toast.fail(response.data.message);
      } else {
        console.log(response);
        return Promise.resolve(response.data.data);
      }
    }
  },
  (error) => {
    Notify({ type: "danger", message: "网络错误，请刷新重试" });
    return Promise.reject(error);
  }
);
export default request;
