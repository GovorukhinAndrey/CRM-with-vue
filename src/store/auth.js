import { firebaseAuth, firebaseDb } from '@/firebase';

export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async logout({ commit }) {
      await firebaseAuth.signOut();
      commit('clearInfo');
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebaseDb.ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    getUid() {
      const user = firebaseAuth.currentUser;
      return user ? user.uid : null;
    },
  },
  modules: {},
};
