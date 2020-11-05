import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NuevaVisita from '../views/NuevaVisita.vue'
import Bitacora from '../views/Bitacora.vue'
import Admin from '../views/Admin.vue';
import Register from '../views/Register.vue';
import VisitasAdmin from '../views/VisitasAdmin.vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
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
    meta: {requiresAuth: true}
  },
  {
    path: '/bitacoras',
    name: 'Bitacora',
    component: Bitacora,
    meta: {requiresAuth: true}
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {requiresAuth: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {requiresAuth: true}
  },
  {
    path: '/visitas-admin',
    name: 'VisitasAdmin',
    component: VisitasAdmin,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  // if((requiresAuth || requiresAdmin) && !isAuthenticated) {
  //   next('/login');
  // } else if(!requiresAuth && isAuthenticated) {
  //   next('/home');
  // } else if(requiresAdmin && isAuthenticated) {
  //   next();
  // } else if(requiresAdmin && isAuthenticated){
  //   const querySnapshot = await firebase.firestore().collection('users_roles').where('userId', '==', isAuthenticated?.uid).get();
  //   querySnapshot.forEach(doc => {
  //     if(doc.data().role === 'admin') {
  //       next();
  //     } else {
  //       next('/home');
  //     }
  //   });
  // } else {
  //   next();
  // }

  if(requiresAuth && !isAuthenticated) {
    next('/login');
  } else if(!requiresAuth && isAuthenticated) {
    next('/Home');
  } else {
    next();
  }
});

export default router
