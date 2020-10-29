<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Registro de Visita</ion-title>
      </ion-toolbar>
    </ion-header>
    <div id="container">
      <div v-if="visits.length < 1">
        <p>No tienes registro de entradas</p>
      </div>
      <ion-card v-for="(visit, index) in visits" :key="index">
        <ion-card-header>
          <ion-card-title>{{ visit.name }} {{ visit.lastname }}</ion-card-title>
          <ion-card-subtitle>{{ visit.plate }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ visit.date }} - {{ visit.time }}
        </ion-card-content>
      </ion-card>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default defineComponent({
  components: {
    IonPage,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
  },
  data() {
    return {
      visits: [] as any[],
      userId: '',
    };
  },
  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = '';
      }
    });
    try {
      console.log(this.userId);
      const querySnapshot = await firebase
        .firestore()
        .collection('visits')
        .where('userId', '==', this.userId)
        .get();
      querySnapshot.forEach((doc) => {
        this.visits.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
}
</style>
