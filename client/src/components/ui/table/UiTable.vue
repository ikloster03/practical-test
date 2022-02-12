<template>
  <div class="ui-table">
    <div class="ui-table__header">
      <slot name="header" />
    </div>
    <div class="ui-table__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiTable',
};
</script>

<style scoped>
.ui-table__header {
  @apply flex justify-between items-center p-5 bg-slate-100;
}
.ui-table__body {
  @apply relative divide-y divide-gray-200;
}
</style>
