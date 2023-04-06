import { createRouter, createWebHistory } from 'vue-router';
import UserAuth  from './pages/auth/UserAuth.vue';
import ImageUpload from './pages/upload/ImageUpload.vue';
import ViewUploadedAssets from './pages/upload/ViewUploadedAssets.vue';
import  NotFound  from './pages/NotFound.vue';
import store from './store/index.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: "/login" },
        { path: '/login', component: UserAuth, meta:{ requiresUnauth: true }},
        { path: '/upload', component: ImageUpload, meta: { requiresAuth: true }},
        { path: '/view', component: ViewUploadedAssets, meta: { requiresAuth: true }},
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

// router.beforeEach(function(to, _, next) {
//     if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
//         next('/login');
//     } else if( to.meta.requiresUnauth && store.getters.isAuthenticated) {
//         next('/view');
//     } else {
//         next();
//     }
// });

export default router;