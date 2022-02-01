<template>
  <div class="ui-preloader__spinner" />
  <div class="ui-preloader__overlay" />
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiPreloader',
  props: {
    size: {
      type: String,
      default: '64px',
    },
    color: {
      type: String,
      default: 'rgb(8 145 178)',
    },
    width: {
      type: String,
      default: '4px',
    },
    bgColor: {
      type: String,
      default: 'rgb(243 244 246)',
    },
    opacity: {
      type: Number,
      default: 0.9,
    },
    top: {
      type: String,
      default: '120px',
    },
  },
  setup(props) {
    const halfSize = computed(() => `${-parseInt(props.size, 10) / 2}px`);

    return {
      halfSize,
    };
  },
};
</script>

<style scoped>
.ui-preloader__overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: v-bind(bgColor);
  opacity: v-bind(opacity);
  z-index: 100;
}

.ui-preloader__spinner {
  @apply animate-spin;
  width: v-bind(size);
  height: v-bind(size);
  border-width: v-bind(width);
  border-style: solid;
  border-color: v-bind(color);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  margin-left: v-bind(halfSize);
  top: v-bind(top);
  z-index: 101;
  border-left-color: v-bind(bgColor);
  background: transparent;
}
</style>
