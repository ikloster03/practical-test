<template>
  <svg
    aria-hidden="true"
    :width="`${width}px`"
    :height="`${height}px`"
    :viewBox="`0 0 ${width} ${height}`">
    <use
      :href="symbolId"
      :fill="color"
      :stroke="strokeColor" />
  </svg>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    strokeColor: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    return { symbolId };
  },
};
</script>

<style scoped>

</style>
