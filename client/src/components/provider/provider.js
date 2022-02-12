import { ProviderService } from '@/services';
import { notifyError, notifySuccess } from '@/utils';
import { ref, watch } from 'vue';
import {
  SUBJECTS,
  EVENTS,
  getErrorText,
  getSuccessText,
} from '@/definitions/notifications';

const useProvider = (loadClientList) => {
  const {
    isFetching: providerListLoading, data: providerList, onFetchError: onFetchProviderError, execute: loadProviderList,
  } = ProviderService.list();

  onFetchProviderError((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-console
    console.error('message', providerList.value?.message ?? '');
    notifyError(getErrorText(SUBJECTS.PROVIDER, EVENTS.LOADING, 'list'));
  });

  const createProvider = (payload) => {
    const {
      data, onFetchError, onFetchResponse,
    } = ProviderService.create(payload);

    console.log('data', data);
    onFetchResponse(() => {
      loadProviderList();
      notifySuccess(getSuccessText(SUBJECTS.PROVIDER, EVENTS.CREATED, payload.name));
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(getErrorText(SUBJECTS.PROVIDER, EVENTS.CREATING, payload.name));
    });
  };

  const updateProvider = (provider, payload) => {
    const {
      data, onFetchError, onFetchResponse,
    } = ProviderService.update(provider._id, payload);

    console.log('data', data);
    onFetchResponse(() => {
      loadProviderList();
      loadClientList();
      notifySuccess(getSuccessText(SUBJECTS.PROVIDER, EVENTS.UPDATED, provider.name));
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(getErrorText(SUBJECTS.PROVIDER, EVENTS.UPDATING, provider.name));
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
      loadClientList();
      notifySuccess(getSuccessText(SUBJECTS.PROVIDER, EVENTS.DELETED, provider.name));
    });
    onFetchError((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-console
      console.error('message', data.value?.message ?? '');
      notifyError(getErrorText(SUBJECTS.PROVIDER, EVENTS.DELETING, provider.name));
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

export const useProviderEmits = (emit) => {
  const createProvider = (payload) => {
    emit('create-provider', payload);
  };

  const updateProvider = (provider, payload) => {
    emit('update-provider', provider, payload);
  };

  const removeProvider = (provider) => {
    emit('remove-provider', provider);
  };

  return {
    createProvider,
    updateProvider,
    removeProvider,
  };
};

export default useProvider;
