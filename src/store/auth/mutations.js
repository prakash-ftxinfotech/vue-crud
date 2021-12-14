export function auth_success(state, token, user) {
  state.token = token;
  state.user = user;
}
export function logout(state) {
  state.token = "";
  state.user = "";
}
