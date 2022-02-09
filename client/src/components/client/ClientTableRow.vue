<template>
  <div
    class="client-table-row"
    :class="{ 'client-table-row_header': header }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ClientTableRow',
  props: {
    header: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.client-table-row {
  @apply grid py-2 odd:bg-white even:bg-slate-100 hover:bg-slate-300;
  grid-template-columns:
    minmax(150px, 1fr)
    minmax(250px, 1.5fr)
    minmax(150px, 0.5fr)
    minmax(350px, 1.5fr)
    minmax(100px, 0.5fr)
    minmax(100px, 0.5fr);
}
.client-table-row_header {
  @apply bg-cyan-600 text-white odd:bg-cyan-600 hover:bg-cyan-600;
}
</style>
