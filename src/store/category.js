import { firebaseDb } from '@/firebase';

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebaseDb.ref(`/users/${uid}/categories`).push({
          title,
          limit,
        });
        return {
          title,
          limit,
          id: category.key,
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
