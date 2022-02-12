<template>
  <li class="provider-list-item">
    <ui-checkbox
      v-model="currentProvider"
      :name="`provider-${provider._id}`"
      :value="provider._id">
      <span v-if="!providerToggle">{{ provider.name }}</span>
      <ui-input
        v-if="providerToggle"
        v-model="editorProvider" />
      <span class="flex">
        <ui-button
          type="link"
          class="pr-2"
          @click.prevent="toggleProvider">
          <ui-icon
            v-if="providerToggle"
            name="close" />
          <ui-icon
            v-else
            name="edit" />
        </ui-button>
        <ui-button
          v-if="providerToggle"
          type="link"
          @click.prevent="updateProvider">
          <ui-icon name="check" />
        </ui-button>
        <ui-button
          v-else
          type="link"
          @click.prevent="removeProvider">
          <ui-icon name="trash" />
        </ui-button>
      </span>
    </ui-checkbox>
  </li>
</template>

<script>
import { computed, ref, watch } from 'vue';
import UiInput from '@/components/ui/form/UiInput.vue';
import UiCheckbox from '@/components/ui/form/UiCheckbox.vue';

export default {
  name: 'ProviderListItem',
  components: {
    UiCheckbox,
    UiInput,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    provider: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update-provider', 'remove-provider'],
  setup(props, { emit }) {
    const currentProvider = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    const editorProvider = ref('');
    const providerToggle = ref(false);

    watch(() => props.provider, () => {
      editorProvider.value = props.provider.name;
    }, { immediate: true });

    const toggleProvider = () => {
      providerToggle.value = !providerToggle.value;
    };
    const updateProvider = () => {
      toggleProvider();
      emit('update-provider', props.provider, { name: editorProvider.value });
    };
    const removeProvider = () => {
      emit('remove-provider', props.provider);
    };

    return {
      currentProvider,
      editorProvider,
      providerToggle,
      toggleProvider,
      updateProvider,
      removeProvider,
    };
  },
};
</script>

<style scoped>

</style>
