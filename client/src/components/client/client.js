import { ClientService } from '@/services';
import { notifyError, notifySuccess } from '@/utils';

export const HEADERS = [
  'Name',
  'Email',
  'Phone',
  'Providers',
  'Edit',
  'Delete',
];

const useClient = (showClientModalForm) => {
  const {
    isFetching: clientListLoading, data: clientList, onFetchError: onFetchClientError, execute: loadClientList,
  } = ClientService.list();

  onFetchClientError((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-console
    console.error('message', clientList.value?.message ?? '');
    notifyError('An error occurred while loading the client\'s list!');
  });

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
      showClientModalForm.value = false;
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
    const shouldDelete = confirm(`Should you would like delete the client: ${client.name}?`);

    if (!shouldDelete) {
      return;
    }

    const {
      data, onFetchError, onFetchResponse,
    } = ClientService.remove(client._id);

    console.log('data', data);
    onFetchResponse(() => {
      showClientModalForm.value = false;
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
    clientListLoading,
    clientList,
    onFetchClientError,
    loadClientList,
    createClient,
    updateClient,
    removeClient,
  };
};

export default useClient;
