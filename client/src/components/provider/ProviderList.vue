<template>
  <ul class="provider-list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'ProviderList',
};
</script>

<style scoped>
.provider-list {
  @apply border border-solid border-gray-300 p-5;
  height: 250px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
