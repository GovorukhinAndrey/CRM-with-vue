<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @create="addNewCategory" />
        <CategoryEdit />
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
  }),
  methods: {
    addNewCategory(event) {
      this.categories.push(event);
    },
  },
};
</script>
