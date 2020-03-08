import axios from 'axios';

export const state = () => ({
  username: null,
  accessToken: null
});

export const getters = {
  username: state => state.username
};

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/user/login', { username, password });
      commit('SET_USER', data.username);
      commit('SET_TOKEN', data.token);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error(e.response.data);
      }
      throw e;
    }
  },
  async logout({ commit }) {
    await axios.post('/api/user/logout');
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.username = user;
  },
  SET_TOKEN(state, token) {
    state.accessToken = token;
  }
};
