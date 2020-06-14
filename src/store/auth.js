import { firebaseAuth, firebaseDb } from '@/firebase';

export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    async login(context, { email, password }) {
      try {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
        throw error.message;
      }
    },
    async logout() {
      await firebaseAuth.signOut();
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebaseDb.ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (error) {
        throw error.message;
      }
    },
    getUid() {
      const user = firebaseAuth.currentUser;
      return user ? user.uid : null;
    },
  },
  modules: {},
};
