import { createApp } from 'vue';
import VueUniversalModal from 'vue-universal-modal';
import UiButton from '@/components/ui/UiButton.vue';
import UiPreloader from '@/components/ui/UiPreloader.vue';
import UiIcon from '@/components/ui/UiIcon.vue';
import UiModal from '@/components/ui/UiModal.vue';
import App from './App.vue';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import 'vue-universal-modal/dist/index.css';
import './index.css';

const app = createApp(App)
  .use(VueUniversalModal, {
    teleportTarget: '#modals',
    modalComponent: 'VueUniversalModal',
  })
  .component('ui-button', UiButton)
  .component('ui-preloader', UiPreloader)
  .component('ui-icon', UiIcon)
  .component('ui-modal', UiModal);

app.config.errorHandler = (err, vm, info) => {
  // eslint-disable-next-line no-console
  console.error(err);
  // eslint-disable-next-line no-console
  console.log(vm);
  // eslint-disable-next-line no-console
  console.info(info);
};
app.mount('#app');
