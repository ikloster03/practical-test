<template>
  <ui-modal
    v-cloak
    v-slot="{ close }"
    v-model="isShown"
    class="client-modal-form">
    <h1>{{ title }}</h1>
    <vee-form v-slot="{ handleSubmit }">
      <ui-group
        v-for="field in schemaFields"
        :key="`field-${field.name}`">
        <template #header>
          {{ field.title }}
        </template>
        <template #default>
          <ui-field v-bind="field" />
        </template>
      </ui-group>

      <provider-create-item @create-provider="createProvider" />

      <ui-group class="pt-8">
        <provider-list>
          <provider-list-item
            v-for="(provider, index) in providers"
            :key="`provider-${provider._id}`"
            v-model="currentProviders[index]"
            :provider="provider"
            @update-provider="updateProvider"
            @remove-provider="removeProvider" />
        </provider-list>
      </ui-group>

      <div class="flex justify-between pt-8">
        <div>
          <ui-button
            v-if="client"
            type="delete"
            @click.prevent="removeClient">
            Delete Client
          </ui-button>
        </div>
        <div class="flex">
          <ui-button
            class="mr-4"
            type="outline"
            @click.prevent="close">
            Cancel
          </ui-button>
          <ui-button
            @click.prevent="handleSubmit(submit)">
            Save Client
          </ui-button>
        </div>
      </div>
    </vee-form>
    <ui-preloader v-if="loading" />
  </ui-modal>
</template>

<script>
import { computed } from 'vue';
import { Form } from 'vee-validate';
import UiGroup from '@/components/ui/UiGroup.vue';
import UiField from '@/components/ui/UiField.vue';
import ProviderList from '@/components/provider/ProviderList.vue';
import ProviderListItem from '@/components/provider/ProviderListItem.vue';
import ProviderCreateItem from '@/components/provider/ProviderCreateItem.vue';
import { useCurrentProviders, useProviderEmits } from '@/components/provider/provider';
import { MODAL_TITLES } from '@/definitions';
import { useClientFields } from '@/components/client/client';

export default {
  name: 'ClientModalForm',
  components: {
    ProviderCreateItem,
    ProviderListItem,
    ProviderList,
    UiGroup,
    UiField,
    'vee-form': Form,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    providers: {
      type: Array,
      default: () => [],
    },
    client: {
      type: [Object, null],
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'create-client',
    'update-client',
    'remove-client',
    'create-provider',
    'update-provider',
    'remove-provider',
  ],
  setup(props, { emit }) {
    const { currentProviders } = useCurrentProviders(props);
    const {
      createProvider,
      updateProvider,
      removeProvider,
    } = useProviderEmits(emit);
    const schemaFields = useClientFields(props);

    const title = computed(() => (props.client ? MODAL_TITLES.EDIT : MODAL_TITLES.CREATE));
    const isShown = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const submit = (data) => {
      const payload = { ...data, providers: currentProviders.value.filter((p) => !!p) };

      if (props.client) {
        emit('update-client', props.client, payload);
      } else {
        emit('create-client', payload);
      }
    };

    const removeClient = () => {
      emit('remove-client', props.client);
    };

    return {
      currentProviders,
      isShown,
      title,
      schemaFields,
      submit,
      removeClient,
      createProvider,
      updateProvider,
      removeProvider,
    };
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.client-modal-form {
  @apply relative;
}

.client-modal-form__container {
  @apply flex justify-center;
}
.client-modal-form__wrapper {
  @apply flex items-center w-3/4 pt-5;
}

.client-modal-form__empty {
  visibility: hidden;
  @apply pr-3 w-2/12;
}

</style>
