<template>
  <div
    class="ui-table-row"
    :class="{ 'ui-table-row_header': header }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiTableRow',
  props: {
    header: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.ui-table-row {
  @apply grid py-2 xl:odd:bg-white xl:even:bg-slate-100 xl:hover:bg-slate-300;
}

.ui-table-row_header {
  @apply hidden xl:grid bg-cyan-600 text-white odd:bg-cyan-600 hover:bg-cyan-600;
}
</style>
