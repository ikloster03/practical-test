import { createFetch } from '@vueuse/core';

const useCustomFetch = createFetch({
  baseUrl: import.meta.env.PROD ? `${import.meta.env.VITE_SERVER_URL}/api/v1` : '/api/v1',
  fetchOptions: {
    mode: 'cors',
  },
});

export default useCustomFetch;
