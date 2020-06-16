<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && $v.title.$error }"
          />
          <label for="name">Название</label>
          <span v-if="$v.title.$dirty && $v.title.$error" class="helper-text invalid">
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && $v.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span v-if="$v.limit.$dirty && $v.limit.$error" class="helper-text invalid">
            Минимальная значение {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) },
  },
  data: () => ({
    select: null,
    title: '',
    limit: 10,
    current: null,
  }),
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('updateCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        });
        this.$emit('update', category);
        this.$message('Категория успешно обновлена');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
