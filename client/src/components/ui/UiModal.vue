<template>
  <vue-universal-modal
    v-model="isShown"
    :close="() => $emit('update:modelValue', false)"
    class="ui-modal">
    <div
      class="ui-modal__container">
      <div class="ui-modal__content">
        <ui-button
          type="close"
          class="ui-modal__close"
          @click.prevent="$emit('update:modelValue', false)">
          <ui-icon name="close" />
        </ui-button>
        <slot :close="() => $emit('update:modelValue', false)" />
      </div>
    </div>
  </vue-universal-modal>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isShown = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { isShown };
  },
};
</script>

<style>
.ui-modal {
  z-index: 102;
}
</style>
<style scoped>
.ui-modal__container {
  @apply grid w-1/2 my-0 mx-auto;
}
.ui-modal__content {
  @apply relative bg-white rounded p-8;
}
.ui-modal__close {
  @apply absolute top-3 right-3;
}
</style>
