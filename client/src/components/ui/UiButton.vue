<template>
  <button
    class="ui-button"
    :class="[currentClass, { 'ui-button_disabled': disabled }]"
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
      outline: 'ui-button_outline',
      close: 'ui-button_close',
      link: 'ui-button_link',
      delete: 'ui-button_delete',
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

.ui-button_outline {
  @apply border-cyan-600 border-2 rounded p-2 text-cyan-600;
}

.ui-button_close {

}

.ui-button_link {
  display: flex;
}

.ui-button_delete {
  @apply bg-red-600 rounded p-2 text-white;
}

.ui-button_disabled {
  @apply opacity-25;
}
</style>
