<template>
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
        v-for="client in clients"
        :key="`row-client-${client._id}`"
        class="ui-table-row_client">
        <ui-table-cell class="font-bold xl:font-normal pb-4 xl:pb-0">
          {{ client.name }}
        </ui-table-cell>
        <ui-table-cell class="pb-2 xl:pb-0">
          {{ client.email }}
        </ui-table-cell>
        <ui-table-cell class="pb-2 xl:pb-0">
          {{ formatPhoneNumber(client.phone) }}
        </ui-table-cell>
        <ui-table-cell
          chips
          class="pb-2 xl:pb-0">
          <provider-chip
            v-for="provider in client.providers"
            :key="`provider-${client._id}-${provider._id}`"
            :provider-name="provider.name" />
        </ui-table-cell>
        <ui-table-cell class="flex justify-between">
          <ui-button
            type="link"
            class="mr-2"
            @click.prevent="openModal(client)">
            <span class="pr-2">
              Edit
            </span>
            <ui-icon name="edit" />
          </ui-button>
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
  </ui-table>
</template>

<script>
import UiTableCell from '@/components/ui/table/UiTableCell.vue';
import UiTableRow from '@/components/ui/table/UiTableRow.vue';
import UiTable from '@/components/ui/table/UiTable.vue';
import ProviderChip from '@/components/provider/ProviderChip.vue';
import { HEADERS } from '@/components/client/client';
import { formatPhoneNumber } from '@/utils';

export default {
  name: 'ClientTable',
  components: {
    UiTableCell,
    UiTableRow,
    UiTable,
    ProviderChip,
  },
  props: {
    clients: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['open-modal', 'remove-client'],
  setup(props, { emit }) {
    const openModal = (client) => {
      emit('open-modal', client);
    };
    const removeClient = (client) => {
      emit('remove-client', client);
    };

    return {
      HEADERS,
      formatPhoneNumber,
      openModal,
      removeClient,
    };
  },
};
</script>

<style scoped>
.ui-table-row_client {

}

@media (min-width: 1280px) {
  .ui-table-row_client {
    grid-template-columns:
    minmax(150px, 1fr)
    minmax(250px, 1.5fr)
    minmax(150px, 0.5fr)
    minmax(350px, 1.5fr)
    minmax(200px, 1fr);
  }
}

</style>
