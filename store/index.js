export const state = () => ({});
export const getters = {};
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.currentUser) {
      commit('user/SET_USER', req.session.currentUser.username);
      commit('user/SET_TOKEN', req.session.currentUser.accessToken);
    }
  }
};
