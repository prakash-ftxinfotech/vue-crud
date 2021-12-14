export function Postlist(state) {
  return state.posts;
}
export const isLoggedIn = (state) => !!state.token;
