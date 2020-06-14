import { firebaseAuth } from '@/firebase';

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
  },
  modules: {},
};
