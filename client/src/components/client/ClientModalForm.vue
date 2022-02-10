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
          <ul class="providers-list">
            <li
              v-for="(provider, index) in providers"
              :key="`provider-${provider._id}`">
              <ui-checkbox
                v-model="currentProviders[index]"
                :name="`provider-${provider._id}`"
                :value="provider._id">
                <span v-if="!providerToggles[index]">{{ provider.name }}</span>
                <ui-input
                  v-if="providerToggles[index]"
                  v-model="editorProviders[index]" />
                <span class="flex">
                  <ui-button
                    type="link"
                    class="pr-2"
                    @click.prevent="toggleProvider(index)">
                    <ui-icon
                      v-if="providerToggles[index]"
                      name="close" />
                    <ui-icon
                      v-else
                      name="edit" />
                  </ui-button>
                  <ui-button
                    v-if="providerToggles[index]"
                    type="link"
                    @click.prevent="updateProvider(index, provider)">
                    <ui-icon name="check" />
                  </ui-button>
                  <ui-button
                    v-else
                    type="link"
                    @click.prevent="removeProvider(provider)">
                    <ui-icon name="trash" />
                  </ui-button>
                </span>
              </ui-checkbox>
            </li>
          </ul>
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
import UiCheckbox from '@/components/ui/UiCheckbox.vue';

export default {
  name: 'ClientModalForm',
  components: {
    UiCheckbox,
    UiInput,
    UiGroup,
    UiField,
    'vee-form': Form,
    // 'vee-field': Field,
    // ErrorMessage,
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
    const editorProviders = ref([]);
    const providerToggles = ref([]);

    const updateProviderList = () => {
      currentProviders.value = props.providers.map(
        (provider) => (props.client?.providers?.find((p) => p._id === provider._id) ? provider._id : ''),
      );
      editorProviders.value = props.providers.map((p) => p.name);
      providerToggles.value = props.providers.map(() => false);
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
      console.log('createProvider', newProvider.value);
      emit('create-provider', { name: newProvider.value });
      newProvider.value = '';
    };

    const toggleProvider = (index) => {
      providerToggles.value[index] = !providerToggles.value[index];
    };

    const updateProvider = (index, provider) => {
      toggleProvider(index);
      emit('update-provider', provider, { name: editorProviders.value[index] });
    };

    const removeProvider = (provider) => {
      emit('remove-provider', provider);
    };

    return {
      newProvider,
      currentProviders,
      editorProviders,
      providerToggles,
      isShown,
      title,
      schemaFields,
      submit,
      removeClient,
      createProvider,
      toggleProvider,
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

.providers-list {
  @apply border border-solid border-gray-300 p-5 w-10/12;
}
</style>
