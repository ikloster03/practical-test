import useCustomFetch from './fetch';

const PROVIDER_API_URL = 'providers';

export const list = () => useCustomFetch(`${PROVIDER_API_URL}`).get().json();

export const create = (payload) => useCustomFetch(`${PROVIDER_API_URL}`).post(payload).json();

export const update = (id, payload) => useCustomFetch(`${PROVIDER_API_URL}/${id}`).put(payload).json();

export const remove = (id) => useCustomFetch(`${PROVIDER_API_URL}/${id}`).delete().json();
