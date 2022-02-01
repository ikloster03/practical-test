import useCustomFetch from './fetch';

const CLIENT_API_URL = 'clients';

export const list = () => useCustomFetch(`${CLIENT_API_URL}`).get().json();

export const create = (payload) => useCustomFetch(`${CLIENT_API_URL}`).post(payload).json();

export const update = (id, payload) => useCustomFetch(`${CLIENT_API_URL}/${id}`).put(payload).json();

export const remove = (id) => useCustomFetch(`${CLIENT_API_URL}/${id}`).delete().json();
