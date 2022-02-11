<template>
  <ui-modal
    v-cloak
    v-slot="{ close }"
    v-model="isShown"
    class="client-modal-form">
    <h1>{{ title }}</h1>
    <vee-form v-slot="{ handleSubmit }">
      <div>
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
      </div>
      <div>
        <ui-group>
          <template #header>
            Providers
          </template>
          <template #default>
            <div class="flex">
              <ui-input
                v-model="newProvider"
                class="w-8/12" />
              <ui-button
                class="w-4/12 ml-4"
                :disabled="!newProvider"
                @click.prevent="createProvider">
                Add Provider
              </ui-button>
            </div>
          </template>
        </ui-group>
      </div>
      <div class="client-modal-form__container">
        <div class="client-modal-form__wrapper">
          <div class="client-modal-form__empty">
            empty
          </div>
          <provider-list>
            <provider-list-item
              v-for="(provider, index) in providers"
              :key="`provider-${provider._id}`"
              v-model="currentProviders[index]"
              :provider="provider"
              @update-provider="updateProvider"
              @remove-provider="removeProvider" />
          </provider-list>
        </div>
      </div>
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
import { computed, ref, watch } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import 'yup-phone';
import UiGroup from '@/components/ui/UiGroup.vue';
import UiField from '@/components/ui/UiField.vue';
import UiInput from '@/components/ui/UiInput.vue';
import ProviderList from '@/components/provider/ProviderList.vue';
import ProviderListItem from '@/components/provider/ProviderListItem.vue';

export default {
  name: 'ClientModalForm',
  components: {
    ProviderListItem,
    ProviderList,
    UiInput,
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
    const newProvider = ref('');
    const currentProviders = ref([]);

    const updateProviderList = () => {
      currentProviders.value = props.providers.map(
        (provider) => (props.client?.providers?.find((p) => p._id === provider._id) ? provider._id : ''),
      );
    };

    watch(() => props.client, () => {
      updateProviderList();
    });

    watch(() => props.providers, () => {
      updateProviderList();
    });

    const title = computed(() => (props.client ? 'Edit client' : 'Create client'));
    const isShown = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const schemaFields = [
      {
        title: 'Name',
        name: 'name',
        as: 'input',
        type: 'text',
        rules: yup.string().required(),
        initialValue: computed(() => props.client?.name ?? ''),
      },
      {
        title: 'Email',
        name: 'email',
        as: 'input',
        type: 'email',
        rules: yup.string().email().required(),
        initialValue: computed(() => props.client?.email ?? ''),
      },
      {
        title: 'Phone',
        name: 'phone',
        as: 'input',
        type: 'text',
        rules: yup.string().phone('US').required(),
        maska: '(###) ###-####',
        initialValue: computed(() => props.client?.phone ?? ''),
      },
    ];

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

    const createProvider = () => {
      emit('create-provider', { name: newProvider.value });
      newProvider.value = '';
    };

    const updateProvider = (provider, payload) => {
      // toggleProvider(index);
      emit('update-provider', provider, payload);
    };

    const removeProvider = (provider) => {
      emit('remove-provider', provider);
    };

    return {
      newProvider,
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
