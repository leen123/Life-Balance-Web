export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: any) {
  return localStorage.setItem("token", token);
}

export default {
  getToken,
};
