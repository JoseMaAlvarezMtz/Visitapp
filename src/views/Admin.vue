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

        <ion-item detail>
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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel} from '@ionic/vue';
import {defineComponent} from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    }
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