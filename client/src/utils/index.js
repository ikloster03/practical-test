import { notify } from '@kyvg/vue3-notification';

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};
const NOTIFICATION_DURATION = 4000;

export const notifySuccess = (text) => notify({
  text,
  type: NOTIFICATION_TYPES.SUCCESS,
  duration: NOTIFICATION_DURATION,
});

export const notifyError = (text) => notify({
  text,
  type: NOTIFICATION_TYPES.ERROR,
  duration: NOTIFICATION_DURATION,
});

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');

    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return null;
};
