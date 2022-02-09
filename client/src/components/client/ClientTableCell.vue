<template>
  <div
    class="client-table-row__cell"
    :class="classes">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ClientTableCell',
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
      'client-table-row__cell_header': props.header,
      'client-table-row__cell_chips': props.chips,
    }));

    return { classes };
  },
};
</script>

<style scoped>
.client-table-row__cell {
  @apply px-5;
}
.client-table-row__cell_header {
  @apply px-5;
}
.client-table-row__cell_chips {
  @apply flex flex-wrap justify-center space-x-2;
}
</style>
