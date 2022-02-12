<template>
  <ui-group>
    <template #header>
      Providers
    </template>
    <template #default>
      <div class="flex">
        <ui-input
          v-model="provider"
          class="w-8/12" />
        <ui-button
          class="w-4/12 ml-4"
          :disabled="!provider"
          @click.prevent="createProvider">
          Add Provider
        </ui-button>
      </div>
    </template>
  </ui-group>
</template>

<script>
import { ref } from 'vue';
import UiGroup from '@/components/ui/form/UiGroup.vue';
import UiInput from '@/components/ui/form/UiInput.vue';

export default {
  name: 'ProviderCreateItem',
  components: { UiInput, UiGroup },
  emits: ['create-provider'],
  setup(props, { emit }) {
    const provider = ref('');
    const createProvider = () => {
      emit('create-provider', { name: provider.value });
      provider.value = '';
    };

    return { provider, createProvider };
  },
};
</script>

<style scoped>

</style>
