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
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories =
          (await firebaseDb.ref(`/users/${uid}/categories`).once('value')).val() || {};
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        await firebaseDb
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
        return { title, limit, id };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
