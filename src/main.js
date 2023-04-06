import { createApp } from 'vue';
import store from './store/index.js';
import router from './router.js';
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
//import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhotoFilm, faUser, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import SmartTable from 'vuejs-smart-table';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

library.add(faPhotoFilm);
library.add(faUser);
library.add(faLock);
library.add(faTrash);
const app = createApp(App);

app.use(router);
app.use(store);
//app.use(SmartTable);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app');
