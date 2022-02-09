<template>
  <div class="client-table">
    <div class="client-table__header">
      <slot name="header" />
    </div>
    <div class="client-table__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientTable',
};
</script>

<style scoped>
.client-table__header {
  @apply flex justify-between items-center p-5 bg-slate-100;
}
.client-table__body {
 @apply relative divide-y divide-gray-200;
}
</style>
