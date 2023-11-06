import Cookies from "js-cookie";

const tokenKey: string = "Token";

export const token_prefix: string = "Bearer ";

export const token_header: string = "Authorization";

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token: string) {
  return Cookies.set(tokenKey, token);
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}
