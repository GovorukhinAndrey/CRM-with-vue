<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="lodaing" />
      <div class="row" v-else>
        <CategoryCreate @create="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          @update="updateCategory"
          :categories="categories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';

export default {
  name: 'Categories',
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  data: () => ({
    categories: [],
    lodaing: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.lodaing = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
