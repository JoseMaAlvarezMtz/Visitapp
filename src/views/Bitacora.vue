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
    <div id="container">
      <div v-if="visits.length < 1">
        <p>No tienes registro de entradas</p>
      </div>
      <ion-card v-for="(visit, index) in visits" :key="index" >
        <ion-card-header>
          <ion-card-title @click="VistaQr(visit.dataID, visit.data.type)">{{ visit.data.name }} {{ visit.data.lastname }}</ion-card-title>
          <ion-card-subtitle>{{ visit.data.plate }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ visit.data.date }} - {{ visit.data.time }}
        </ion-card-content>
      </ion-card>
    </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
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
    IonCardHeader,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
  },
  data() {
    return {
      visits: [] as any[],
      userId: '',
    };
  },
  methods: {
    VistaQr(uid: any, type: any){
      this.$router.push({name:'Generaqr', params:{visit: uid}, query:{type: type}});
    }
  },
  
  async created() {
    // await firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.userId = user.uid;
    //   } else {
    //     this.userId = '';
    //   }
    // });
    console.log(firebase.auth().currentUser?.uid);
    try {
      // console.log(this.userId);
      const querySnapshot = await firebase
        .firestore()
        .collection('visits')
        .where('userId', '==', firebase.auth().currentUser?.uid)
        .get();
      querySnapshot.forEach((doc) => {
        const dataID = doc.id
        this.visits.push({data: doc.data(), dataID});
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
