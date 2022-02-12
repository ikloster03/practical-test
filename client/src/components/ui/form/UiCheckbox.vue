<template>
  <label
    :for="name"
    class="ui-checkbox">
    <input
      :id="name"
      v-model="proxyModel"
      :value="value"
      type="checkbox"
      class="ui-checkbox__input">
    <div class="ui-checkbox__label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiCheckbox',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyModel = computed({
      get: () => !!props.modelValue,
      set: (value) => emit('update:modelValue', value ? props.value : ''),
    });

    return { proxyModel };
  },
};
</script>

<style scoped>
.ui-checkbox__input {
  @apply
  form-check-input
  appearance-none
  h-4 w-4
  mt-1 mr-2
  border border-gray-300 rounded-sm
  bg-white
  checked:bg-blue-600 checked:border-blue-600
  focus:outline-none
  transition duration-200
  align-top
  bg-no-repeat bg-center bg-contain
  float-left
  cursor-pointer;
}
.ui-checkbox__label {
  @apply flex justify-between;
}
</style>
