import { firebaseDb } from '@/firebase';

export default {
  namespace: true,
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebaseDb.ref(`/users/${uid}/records`).push(record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
