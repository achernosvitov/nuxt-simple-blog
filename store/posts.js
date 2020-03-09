export const state = () => ({
  all: []
});

export const getters = {
  all: state => state.all
};

export const actions = {
  async loadPosts({ commit }) {
    try {
      const data = await this.$axios.$get('/api/posts');
      commit('SET_POSTS', data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  }
};

export const mutations = {
  SET_POSTS(state, posts) {
    state.all = posts;
  }
};
