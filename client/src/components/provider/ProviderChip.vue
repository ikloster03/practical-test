<template>
  <span
    class="provider-chip">
    {{ providerName }}
  </span>
</template>

<script>
export default {
  name: 'ProviderChip',
  props: {
    providerName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.provider-chip {
  @apply px-2 py-1 m-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm  w-max cursor-pointer active:bg-gray-300;
}
</style>
