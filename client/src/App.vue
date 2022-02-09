<template>
  <div class="container mx-auto py-10">
    <client-table>
      <template #header>
        <h1>
          Clients
        </h1>
        <ui-button
          class="flex"
          @click.prevent="openModal">
          <ui-icon name="plus" />
          <span>New Client</span>
        </ui-button>
      </template>
      <template
        v-if="!loading"
        #default>
        <client-table-row header>
          <client-table-cell
            v-for="header in headers"
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
            <span
              v-for="provider in client.providers"
              :key="`provider-${client._id}-${provider._id}`"
              class="provider-chip">
              {{ provider.name }}
            </span>
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
      :providers="providerList"
      :client="selectedClient"
      @submit="createClient" />
    <notifications position="bottom right" />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { formatPhoneNumber, notifySuccess, notifyError } from '@/utils';
import { ClientService, ProviderService } from '@/services';
import ClientTable from '@/components/client/ClientTable.vue';
import ClientTableRow from '@/components/client/ClientTableRow.vue';
import ClientModalForm from '@/components/client/ClientModalForm.vue';
import ClientTableCell from '@/components/client/ClientTableCell.vue';

export default {
  components: {
    ClientTableCell,
    ClientModalForm,
    ClientTableRow,
    ClientTable,
  },
  setup() {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Providers',
      'Edit',
      'Delete',
    ];

    const showClientModalForm = ref(false);
    const selectedClient = ref(null);

    const {
      isFetching: clientListLoading, data: clientList, onFetchError: onFetchClientError, execute: loadClientList,
    } = ClientService.list();
    const { isFetching: providerListLoading, data: providerList, onFetchError: onFetchProviderError } = ProviderService.list();

    const loading = computed(() => clientListLoading.value || providerListLoading.value);

    onFetchClientError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', clientList.value?.message ?? '');
      notifyError('An error occurred while loading the client\'s list!');
    });

    onFetchProviderError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', providerList.value?.message ?? '');
      notifyError('An error occurred while loading the provider\'s list!');
    });

    const openModal = (client = null) => {
      selectedClient.value = client;
      showClientModalForm.value = true;
    };

    const createClient = (payload) => {
      const {
        data, onFetchError, onFetchResponse,
      } = ClientService.create(payload);

      console.log('data', data);
      onFetchResponse(() => {
        showClientModalForm.value = false;
        loadClientList();
        notifySuccess(`The client ${payload.name} was successfully created!`);
      });
      onFetchError((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-console
        console.error('message', data.value?.message ?? '');
        notifyError(`An error occurred while creating the client ${payload.name}!`);
      });
    };

    const updateClient = (client, payload) => {
      const {
        data, onFetchError, onFetchResponse,
      } = ClientService.update(client._id, payload);

      console.log('data', data);
      onFetchResponse(() => {
        loadClientList();
        notifySuccess(`The client ${client.name} was successfully updated!`);
      });
      onFetchError((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-console
        console.error('message', data.value?.message ?? '');
        notifyError(`An error occurred while updating the client ${client.name}!`);
      });
    };

    const removeClient = (client) => {
      // eslint-disable-next-line no-restricted-globals,no-alert
      const shouldDelete = confirm(`Should you would like delete ${client.name}?`);

      if (!shouldDelete) {
        return;
      }

      const {
        data, onFetchError, onFetchResponse,
      } = ClientService.remove(client._id);

      console.log('data', data);
      onFetchResponse(() => {
        loadClientList();
        notifySuccess(`The client ${client.name} was successfully deleted!`);
      });
      onFetchError((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-console
        console.error('message', data.value?.message ?? '');
        notifyError(`An error occurred while deleting the client ${client.name}!`);
      });
    };

    return {
      headers,
      showClientModalForm,
      selectedClient,
      clientList,
      providerList,
      loading,
      formatPhoneNumber,
      openModal,
      createClient,
      updateClient,
      removeClient,
    };
  },
};
</script>

<style scoped>
.provider-chip {
  @apply px-2 py-1 m-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm  w-max cursor-pointer active:bg-gray-300;
}

</style>
