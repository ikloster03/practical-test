<template>
  <button
    class="ui-button"
    :class="currentClass"
    :disabled="disabled"
    @click="$emit('click', $event)">
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props) {
    const dict = {
      primary: 'ui-button_primary',
      close: 'ui-button_close',
    };

    if (!dict[props.type]) {
      throw new Error('There is no type for the button');
    }

    const currentClass = computed(() => dict[props.type]);

    return { currentClass };
  },
};
</script>

<style scoped>
.ui-button {

}

.ui-button_primary {
  @apply bg-cyan-600 rounded p-2 text-white;
}
</style>
