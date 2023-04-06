import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import uploadModule from './modules/upload/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        upload: uploadModule
    }
});

export default store;