<template>
  <div class="container mx-auto py-10">
    <ui-table>
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
        <ui-table-row
          header
          class="ui-table-row_client">
          <ui-table-cell
            v-for="header in HEADERS"
            :key="`header-${header}`"
            header>
            {{ header }}
          </ui-table-cell>
        </ui-table-row>
        <ui-table-row
          v-for="client in clientList"
          :key="`row-client-${client._id}`"
          class="ui-table-row_client">
          <ui-table-cell>
            {{ client.name }}
          </ui-table-cell>
          <ui-table-cell>
            {{ client.email }}
          </ui-table-cell>
          <ui-table-cell>
            {{ formatPhoneNumber(client.phone) }}
          </ui-table-cell>
          <ui-table-cell chips>
            <provider-chip
              v-for="provider in client.providers"
              :key="`provider-${client._id}-${provider._id}`"
              :provider-name="provider.name" />
          </ui-table-cell>
          <ui-table-cell>
            <ui-button
              type="link"
              @click.prevent="openModal(client)">
              <span class="pr-2">
                Edit
              </span>
              <ui-icon name="edit" />
            </ui-button>
          </ui-table-cell>
          <ui-table-cell>
            <ui-button
              type="link"
              @click.prevent="removeClient(client)">
              <span class="pr-2">
                Delete
              </span>
              <ui-icon name="trash" />
            </ui-button>
          </ui-table-cell>
        </ui-table-row>
      </template>
      <ui-preloader v-if="loading" />
    </ui-table>
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
import ClientModalForm from '@/components/client/ClientModalForm.vue';
import useClient, { HEADERS } from '@/components/client/client';
import useProvider from '@/components/provider/provider';
import UiTable from '@/components/ui/table/UiTable.vue';
import UiTableRow from '@/components/ui/table/UiTableRow.vue';
import UiTableCell from '@/components/ui/table/UiTableCell.vue';

export default {
  components: {
    UiTableCell,
    UiTableRow,
    UiTable,
    ProviderChip,
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
.ui-table-row_client {
  grid-template-columns:
    minmax(150px, 1fr)
    minmax(250px, 1.5fr)
    minmax(150px, 0.5fr)
    minmax(350px, 1.5fr)
    minmax(100px, 0.5fr)
    minmax(100px, 0.5fr);
}
</style>
