<template>
  <div class="container mx-auto py-10">
    <client-table
      :loading="loading"
      :clients="clientList"
      @open-modal="openModal"
      @remove-client="removeClient" />
    <client-modal-form
      v-model="showClientModalForm"
      v-bind="modal.attrs"
      v-on="modal.events" />
    <ui-preloader v-if="loading" />
    <notifications position="bottom right" />
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { formatPhoneNumber } from '@/utils';
import ClientModalForm from '@/components/client/ClientModalForm.vue';
import useClient, { HEADERS } from '@/components/client/client';
import useProvider from '@/components/provider/provider';
import ClientTable from '@/components/client/ClientTable.vue';

export default {
  components: {
    ClientTable,
    ClientModalForm,
  },
  setup() {
    const showClientModalForm = ref(false);
    const selectedClient = ref(null);

    const {
      clientListLoading,
      clientList,
      createClient,
      updateClient,
      removeClient,
    } = useClient(showClientModalForm);

    const {
      providerListLoading,
      providerList,
      createProvider,
      updateProvider,
      removeProvider,
    } = useProvider();

    const loading = computed(() => clientListLoading.value || providerListLoading.value);

    const modal = reactive({
      attrs: {
        providers: providerList,
        loading: providerListLoading,
        client: selectedClient,
      },
      events: {
        'create-client': createClient,
        'update-client': updateClient,
        'remove-client': removeClient,
        'create-provider': createProvider,
        'update-provider': updateProvider,
        'remove-provider': removeProvider,
      },
    });

    const openModal = (client) => {
      selectedClient.value = client;
      showClientModalForm.value = true;
    };

    return {
      HEADERS,
      showClientModalForm,
      clientList,
      loading,
      modal,
      formatPhoneNumber,
      openModal,
      createClient,
      updateClient,
      removeClient,
      createProvider,
      updateProvider,
      removeProvider,
    };
  },
};
</script>

<style scoped>

</style>
