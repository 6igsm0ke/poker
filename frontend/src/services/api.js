import axios from "axios";
import TokenService from "./tokenService";

const API = axios.create({ baseURL: "https://poker-4gmu.onrender.com/api/v1/auth/" });

API.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const rs = await axios.post("https://poker-4gmu.onrender.com/api/v1/auth/refresh/", {
          refresh: TokenService.getLocalRefreshToken(),
        });
        TokenService.updateLocalAccessToken(rs.data.access);
        API.defaults.headers["Authorization"] = `Bearer ${rs.data.access}`;
        return API(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default API;