<template>
  <div class="ui-field">
    <component
      v-bind="{
        name,
        errorMessage,
        required,
        ...attrs,
      }"
      :is="currentComponent"
      v-model="value"
      @update:model-value="change" />
  </div>
</template>

<script>
import { toRefs, defineAsyncComponent, computed } from 'vue';
import { useField } from 'vee-validate';

export default {
  name: 'UiField',
  props: {
    as: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    rules: {
      type: Object,
      default: null,
    },
    initialValue: {
      type: [String, Boolean],
      default: '',
    },
  },
  emits: ['change-field'],
  setup(props, { emit }) {
    const {
      as, name, rules, initialValue, ...attrs
    } = toRefs(props);

    const { required } = rules.value ? rules.value.exclusiveTests : {};

    const dict = {
      input: defineAsyncComponent(() => import('@/components/ui/UiInput.vue')),
      checkbox: defineAsyncComponent(() => import('@/components/ui/UiCheckbox.vue')),
    };

    if (!dict[as.value]) {
      throw new Error('There is no type for the form\'s field');
    }

    const currentComponent = computed(() => dict[as.value]);

    const { errorMessage, value, handleChange } = useField(name.value, rules.value, { initialValue: initialValue.value });

    const change = (data) => {
      emit('change-field', data);
      handleChange(data);
    };

    return {
      currentComponent,
      required,
      attrs,
      errorMessage,
      value,
      change,
    };
  },
};
</script>

<style scoped>
.ui-field {
  @apply py-3;
}
</style>
