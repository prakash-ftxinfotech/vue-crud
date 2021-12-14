import axios from "axios";
import { Notify } from "quasar";
export function login({ commit }, body) {
  axios
    .post("https://reqres.in/api/login", body)

    .then((resp) => {
      if (resp.data) {
        const token = resp.data.token;
        const user = body;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
        Notify.create({
          message: "Login Successfully",
          color: "green",
        });
      }
      console.log(body);
    })
    .catch((err) => {
      Notify.create({
        message: "Invalid user credential",
        color: "red",
      });
    });
}
export function logout({ commit }) {
  commit("logout");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  Notify.create({
    message: "Logout Successfully",
    color: "green",
  });
}
