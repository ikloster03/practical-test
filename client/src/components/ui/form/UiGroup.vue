<template>
  <div class="ui-group">
    <div class="ui-group__container">
      <div class="ui-group__header">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div class="ui-group__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.ui-group {
  @apply flex;
}

.ui-group__container {
  @apply w-full;
}

@media (min-width: 1280px) {
  .ui-group {
    @apply flex justify-center;
  }
  .ui-group__container {
    @apply flex items-center;
  }
  .ui-group__container {
    @apply w-3/4;
  }
  .ui-group__header {
    @apply pr-3 w-2/12;
  }
  .ui-group__body {
    @apply w-full w-10/12;
  }
}
</style>
