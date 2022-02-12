<template>
  <div
    class="ui-table-row__cell"
    :class="classes">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiTableCell',
  props: {
    header: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = computed(() => ({
      'ui-table-row__cell_header': props.header,
      'ui-table-row__cell_chips': props.chips,
    }));

    return { classes };
  },
};
</script>

<style scoped>
.ui-table-row__cell {
  @apply px-5;
}
.ui-table-row__cell_header {
  @apply px-5;
}
.ui-table-row__cell_chips {
  @apply flex flex-wrap xl:justify-center space-x-2;
}
</style>
