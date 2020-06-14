<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"></Loader>
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null,
  }),
  components: {
    HomeBill,
    HomeCurrency,
  },
  async mounted() {
    await this.getCurrency();
    this.loading = false;
  },
  methods: {
    async getCurrency() {
      this.currency = await this.$store.dispatch('fetchCurrency');
    },
    async refresh() {
      this.loading = true;
      await this.getCurrency();
      this.loading = false;
    },
  },
};
</script>
