import http from "../services/httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "auth";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser(jwt) {
  try {
    const token = localStorage.getItem(tokenKey);
    const user = jwtDecode(token);
    return user;
  } catch (ex) {
    return null;
  }
}
const auth = {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
};
export default auth;
