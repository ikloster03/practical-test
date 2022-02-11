<template>
  <div class="container mx-auto py-10">
    <client-table>
      <template #header>
        <h1>
          Clients
        </h1>
        <ui-button
          class="flex"
          @click.prevent="openModal(null)">
          <ui-icon name="plus" />
          <span>New Client</span>
        </ui-button>
      </template>
      <template
        v-if="!loading"
        #default>
        <client-table-row header>
          <client-table-cell
            v-for="header in HEADERS"
            :key="`header-${header}`"
            header>
            {{ header }}
          </client-table-cell>
        </client-table-row>
        <client-table-row
          v-for="client in clientList"
          :key="`row-client-${client._id}`">
          <client-table-cell>
            {{ client.name }}
          </client-table-cell>
          <client-table-cell>
            {{ client.email }}
          </client-table-cell>
          <client-table-cell>
            {{ formatPhoneNumber(client.phone) }}
          </client-table-cell>
          <client-table-cell chips>
            <provider-chip
              v-for="provider in client.providers"
              :key="`provider-${client._id}-${provider._id}`"
              :provider-name="provider.name" />
          </client-table-cell>
          <client-table-cell>
            <ui-button
              type="link"
              @click.prevent="openModal(client)">
              <span class="pr-2">
                Edit
              </span>
              <ui-icon name="edit" />
            </ui-button>
          </client-table-cell>
          <client-table-cell>
            <ui-button
              type="link"
              @click.prevent="removeClient(client)">
              <span class="pr-2">
                Delete
              </span>
              <ui-icon name="trash" />
            </ui-button>
          </client-table-cell>
        </client-table-row>
      </template>
      <ui-preloader v-if="loading" />
    </client-table>
    <client-modal-form
      v-model="showClientModalForm"
      v-bind="modal.attrs"
      v-on="modal.events" />
    <notifications position="bottom right" />
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { formatPhoneNumber } from '@/utils';
import ProviderChip from '@/components/provider/ProviderChip.vue';
import ClientTable from '@/components/client/ClientTable.vue';
import ClientTableRow from '@/components/client/ClientTableRow.vue';
import ClientModalForm from '@/components/client/ClientModalForm.vue';
import ClientTableCell from '@/components/client/ClientTableCell.vue';
import useClient, { HEADERS } from '@/components/client/client';
import useProvider from '@/components/provider/provider';

export default {
  components: {
    ProviderChip,
    ClientTableCell,
    ClientModalForm,
    ClientTableRow,
    ClientTable,
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

    const openModal = (client = null) => {
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
