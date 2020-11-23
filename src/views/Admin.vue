<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Suburban Access</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-title>Admin</ion-title>
    </ion-content> 

    <div id="container">
      <ion-list>
        <ion-item detail @click="registerUser">
          <ion-label>Registrar usuario</ion-label>
        </ion-item>
    
        <ion-item detail @click="visitas">
          <ion-label>Todas las entradas</ion-label>
        </ion-item>

        <ion-item detail @click="scanner">
          <ion-label>Escanear QR</ion-label>
        </ion-item>

        <ion-item detail @click="logout">
          <ion-label>Cerrar sesión</ion-label>
        </ion-item> 
      </ion-list>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, useBackButton, useIonRouter} from '@ionic/vue';
import {Plugins} from '@capacitor/core';
import {defineComponent} from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

const {App} = Plugins;

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
        await this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
    registerUser() {
      this.$router.push('/register');
    },
    visitas() {
      this.$router.push('/visitas-admin');
    },
    scanner() {
      this.$router.push({name: 'Scanner'});
    }
  },
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if(!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
}
</style>