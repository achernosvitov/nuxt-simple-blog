export const state = () => ({
  post: null,
  comments: []
});

export const getters = {
  post: state => state.post,
  comments: state => state.comments
};

export const actions = {
  async loadPost({ commit }, { postId }) {
    try {
      const data = await this.$axios.$get(`/api/posts/${postId}`);
      commit('SET_POST', data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  },
  async loadComments({ commit }, { postId }) {
    try {
      const data = await this.$axios.$get(`/api/comments?articleId=${postId}`);
      commit('SET_COMMENTS', data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  },
  async postComment({ commit }, { postId, username, text }) {
    try {
      await this.$axios.$post('/api/comments', { postId, username, text });
    } catch (e) {
      if (e.response) {
        if (e.response.status === 403 || e.response.status === 400) {
          throw new Error(e.response.data);
        }
        throw e;
      }
    }
  }
};

export const mutations = {
  SET_POST(state, post) {
    state.post = post;
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  }
};
