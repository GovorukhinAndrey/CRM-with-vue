import { firebaseDb } from '@/firebase';

export default {
  namespace: true,
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  getters: {
    info: s => s.info,
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebaseDb.ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
