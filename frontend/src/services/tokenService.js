const getLocalRefreshToken = () => localStorage.getItem("refreshTkn");
const getLocalAccessToken = () => localStorage.getItem("accessTkn");
const updateLocalAccessToken = (token) => localStorage.setItem("accessTkn", token);
const updateLocalRefreshToken = (token) => localStorage.setItem("refreshTkn", token);
const removeTokens = () => {
  localStorage.removeItem("refreshTkn");
  localStorage.removeItem("accessTkn");
};
const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  removeTokens,
};
export default TokenService;