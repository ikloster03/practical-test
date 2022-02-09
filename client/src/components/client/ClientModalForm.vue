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
      <div>
        <ul>
          <li
            v-for="(provider, index) in providers"
            :key="`provider-${provider._id}`">
            <ui-checkbox
              v-model="currentProviders[index]"
              :name="`provider-${provider._id}`"
              :value="provider._id">
              {{ provider.name }}
            </ui-checkbox>
          </li>
        </ul>
      </div>
      <div class="flex">
        <ui-button @click.prevent="handleSubmit(submit)">
          Submit
        </ui-button>
        <ui-button @click.prevent="close">
          Cancel
        </ui-button>
      </div>
    </vee-form>
  </ui-modal>
</template>

<script>
import { computed, ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
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
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const newProvider = ref('');
    const currentProviders = ref([]);
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
        type: 'text',
        rules: yup.string().email().required(),
        initialValue: computed(() => props.client?.email ?? ''),
      },
      {
        title: 'Phone',
        name: 'phone',
        as: 'input',
        type: 'text',
        rules: yup.string().required(),
        initialValue: computed(() => props.client?.phone ?? ''),
      },
    ];

    const submit = (data) => {
      console.log('data', { ...data, providers: currentProviders.value.filter((p) => !!p) });
      emit('submit', { ...data, providers: currentProviders.value.filter((p) => !!p) });
    };

    const createProvider = () => {
      console.log('createProvider', newProvider.value);
    };

    return {
      newProvider,
      currentProviders,
      isShown,
      title,
      schemaFields,
      submit,
      createProvider,
    };
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
