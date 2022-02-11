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
.providers-list {
  @apply border border-solid border-gray-300 p-5 w-10/12;
}
</style>
