import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpDobHXQxo-7OQslYDUhknjaZYGZFhqCc',
  authDomain: 'suburban-access-backend.firebaseapp.com',
  databaseURL: 'https://suburban-access-backend.firebaseio.com',
  projectId: 'suburban-access-backend',
  storageBucket: 'suburban-access-backend.appspot.com',
  messagingSenderId: '908760750004',
  appId: '1:908760750004:web:0c7cc238841031170dc4e1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// let app = '' as any;

// firebase.auth().onAuthStateChanged((user) => {
//   console.log(user);
//   if (!app) {
//     app = createApp(App)
//       .use(IonicVue)
//       .use(router);

//     router.isReady().then(() => {
//       app.mount('#app');
//     });
//   }
// });

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
