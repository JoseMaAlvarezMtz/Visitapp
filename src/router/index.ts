import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NuevaVisita from '../views/NuevaVisita.vue'
import Bitacora from '../views/Bitacora.vue'
import Generaqr from '../views/Generaqr.vue'
// import firebase from 'firebase/app';
// import 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/nuevavisita',
    name: 'NuevaVisita',
    component: NuevaVisita,
    // meta: {requiresAuth: true}
  },
  {
    path: '/bitacoras',
    name: 'Bitacora',
    component: Bitacora
  },
  {
    path: '/genera',
    name: 'Generaqr',
    component: Generaqr
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser;
//   if(requiresAuth && !isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router
