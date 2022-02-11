import { ProviderService } from '@/services';
import { notifyError, notifySuccess } from '@/utils';
import { ref, watch } from 'vue';

const useProvider = () => {
  const {
    isFetching: providerListLoading, data: providerList, onFetchError: onFetchProviderError, execute: loadProviderList,
  } = ProviderService.list();

  onFetchProviderError((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-console
    console.error('message', providerList.value?.message ?? '');
    notifyError('An error occurred while loading the provider\'s list!');
  });

  const createProvider = (payload) => {
    const {
      data, onFetchError, onFetchResponse,
    } = ProviderService.create(payload);

    console.log('data', data);
    onFetchResponse(() => {
      loadProviderList();
      notifySuccess(`The provider ${payload.name} was successfully created!`);
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(`An error occurred while creating the provider ${payload.name}!`);
    });
  };

  const updateProvider = (provider, payload) => {
    const {
      data, onFetchError, onFetchResponse,
    } = ProviderService.update(provider._id, payload);

    console.log('data', data);
    onFetchResponse(() => {
      loadProviderList();
      notifySuccess(`The provider ${provider.name} was successfully updated!`);
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(`An error occurred while updating the provider ${provider.name}!`);
    });
  };

  const removeProvider = (provider) => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    const shouldDelete = confirm(`Should you would like delete the provider: ${provider.name}?`);

    if (!shouldDelete) {
      return;
    }

    const {
      data, onFetchError, onFetchResponse,
    } = ProviderService.remove(provider._id);

    console.log('data', data);
    onFetchResponse(() => {
      loadProviderList();
      notifySuccess(`The provider ${provider.name} was successfully deleted!`);
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(`An error occurred while deleting the provider ${provider.name}!`);
    });
  };

  return {
    providerListLoading,
    providerList,
    onFetchProviderError,
    loadProviderList,
    createProvider,
    updateProvider,
    removeProvider,
  };
};

export const useCurrentProviders = (props) => {
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

  return { currentProviders };
};

export default useProvider;
