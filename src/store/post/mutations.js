export function GET_POST(state, postlist) {
  state.posts = postlist.reverse();
}

export function SET_LOADING(state, loading) {
  state.loading = loading;
}

export function ADD_POST(state, post) {
  state.posts.unshift(post);
}

export function EDIT_POST(state, post) {
  let postIndex = state.posts.findIndex((data) => data.id == post.id);
  if (postIndex != -1) {
    state.posts = Object.assign([], state.posts, { [postIndex]: post });
  }
}

export function FILTER_POST(state, body) {
  let filterdata = body.response.data;
  if (body.searchval !== "") {
    state.posts = [];
    filterdata.forEach((element) => {
      if (element.title.match(body.searchval)) state.posts.unshift(element);
    });
  } else {
    state.posts = filterdata;
    state.posts.reverse();
  }
}
