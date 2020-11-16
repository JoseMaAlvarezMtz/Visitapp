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
    <ion-content :fullscreen="true">
      <ion-card style="text-align: center;">
        <ion-card-header>
          <ion-card-title>{{ visit.name }} {{ visit.lastname }}</ion-card-title>
          <ion-card-subtitle>{{ visit.plate }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ visit.date }} - {{ visit.time }}
        </ion-card-content>
      </ion-card>
      <ion-title style="text-align: center;">Tipo: {{type}}</ion-title>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from 'vue';
import {IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent} from '@ionic/vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default defineComponent({
  data() {
    return {
      visit: {},
      id: this.$route.params.visitId,
      type: this.$route.query.type
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent
  },
  created() {
    firebase.firestore().collection('visits').doc(this.id).get().then(doc => {
      this.visit = doc.data();
    }).catch(error => {
      console.log(error);
    });
  }
})
</script>

<style>

</style>