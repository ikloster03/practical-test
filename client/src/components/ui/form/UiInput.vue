<template>
  <div class="ui-input">
    <input
      v-maska="maska"
      v-bind="$attrs"
      :value="modelValue"
      type="text"
      class="ui-input__input"
      :class="{ 'ui-input__input_error': !!errorMessage }"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="onFocus"
      @blur="onFocus">
    <div
      v-show="errorMessage"
      class="ui-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'UiInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    maska: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const isFocused = ref(false);

    const isActive = computed(() => !!props.modelValue || !!isFocused.value);

    const onFocus = () => {
      isFocused.value = !isFocused.value;
    };

    return {
      isActive,
      onFocus,
    };
  },
};
</script>

<style scoped>
.ui-input {
  @apply relative;
}

.ui-input__input {
  @apply
    form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}

.ui-input__input_error {
  @apply border-red-600;
}

.ui-input__error {
  @apply absolute text-red-600;
  height: 24px;
  overflow: hidden;
}
</style>
