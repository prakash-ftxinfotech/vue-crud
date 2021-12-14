import { date } from "quasar";
import { api } from "src/boot/axios";
import axios from "axios";
import { Notify } from "quasar";

export function getpostlist({ commit }) {
  commit("SET_LOADING", true);
  api.get("/postlist").then((response) => {
    commit("GET_POST", response.data);
  });
  commit("SET_LOADING", false);
}

export function submitPost({ commit }, post) {
  let todaydate = new Date();

  api
    .post("/postlist", {
      id: Math.random(),
      title: post.posttitle,
      desc: post.postdesc,
      author: `prakash ${Math.random()}`,
      datetime:
        todaydate.getDate() +
        "-" +
        (todaydate.getMonth() + 1) +
        "-" +
        todaydate.getFullYear(),
    })
    .then((response) => {
      Notify.create({
        message: "Post Created Successfully",
        color: "green",
      });
      commit("ADD_POST", response.data);
    });
}

export function removepost({ commit }, id) {
  api.delete(`/postlist/${id}`).then(() => {
    api.get("/postlist").then((response) => {
      commit("GET_POST", response.data);
    });
    Notify.create({
      message: "Post Delete Successfully",
      color: "red",
    });
  });
}

export async function editpost({ state, commit }, id) {
  try {
    const response = await api.get(`/postlist/${id}`);
    if (response && response.status == 200) {
      return response.data;
    }
    return new Error(error.message);
  } catch (error) {
    return new Error(error.message);
  }
}

export function updatepost({ commit }, post) {
  api.put(`/postlist/${post.id}`, post).then((response) => {
    console.log(response.data);
    Notify.create({
      message: "Post Updated Successfully",
      color: "green",
    });
    commit("EDIT_POST", response.data);
  });
}
export function searchpost({ commit }, searchval) {
  commit("SET_LOADING", true);
  api.get("/postlist").then((response) => {
    commit("FILTER_POST", { response, searchval });
  });
  commit("SET_LOADING", false);
}
