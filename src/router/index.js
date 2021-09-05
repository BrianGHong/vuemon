import VueRouter from 'vue-router';
import Profile from '../views/Profile.vue';
import Search from '../views/Search.vue';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search,
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
