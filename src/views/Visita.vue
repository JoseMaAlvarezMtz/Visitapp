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
      <ion-card v-if="type == 'entrada'">
        <ion-item>
          <ion-label position="floating">Nombre</ion-label>
          <ion-input
            :value="visit.name"
            @input="changeName($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Apellidos</ion-label>
          <ion-input
            :value="visit.lastname"
            @input="changeLastName($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Placa</ion-label>
          <ion-input
            :value="visit.plate"
            @input="changePlate($event)"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Fecha de acceso</ion-label>
          <ion-datetime
            display-format="YYYY-MM-DD"
            :value="visit.date"
            readonly="true"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Hora de acceso</ion-label>
          <ion-datetime
            display-format="HH-mm"
            :value="visit.time"
            readonly="true"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Tipo de codigo QR</ion-label>
          <ion-input :value="visit.type" readonly="true"></ion-input>
        </ion-item>
        <ion-button @click="updateValue">
          Editar valores
        </ion-button>
        <ion-button @click="accept">
          Aceptar acceso
        </ion-button>
      </ion-card>
      <ion-card v-if="type == 'salida'" style="text-align: center;">
        <ion-card-header>
          <ion-card-title>{{ visit.name }} {{ visit.lastname }}</ion-card-title>
          <ion-card-subtitle>{{ visit.plate }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ visit.date }} - {{ visit.time }} - tipo: {{ visit.type }}
        </ion-card-content>
        <ion-button @click="acceptExit">
          Aceptar salida
        </ion-button>
      </ion-card>
      <ion-title style="text-align: center;"
        >Tipo de codigo QR: {{ type }}</ion-title
      >
      <ion-button @click="goHome" v-if="visit.type !== type">
        Ir a la pantalla principal
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  alertController,
} from '@ionic/vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default defineComponent({
  data() {
    return {
      visit: {},
      id: this.$route.params.visitId,
      type: this.$route.query.type,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  },
  async created() {
    await firebase
      .firestore()
      .collection('visits')
      .doc(this.id)
      .get()
      .then((doc) => {
        this.visit = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
    if (this.visit.type !== this.type) {
      const alert = await alertController.create({
        cssClass: 'my-custom-class',
        header: 'Suburban Access',
        subHeader: 'Alerta',
        message:
          'El tipo de visita es diferente al tipo de visita del codigo QR',
        buttons: ['OK'],
      });
      alert.present();
    }
  },
  methods: {
    async updateValue() {
      if (this.visit.type !== this.type) {
        const alert = await alertController.create({
          cssClass: 'my-custom-class',
          header: 'Suburban Access',
          subHeader: 'Alerta',
          message:
            'El tipo de visita es diferente al tipo de visita del codigo QR. No se puede editar los valores',
          buttons: ['OK'],
        });
        alert.present();
      } else {
        await firebase
          .firestore()
          .collection('visits')
          .doc(this.id)
          .update({
            name: this.visit.name,
            lastname: this.visit.lastname,
            plate: this.visit.plate,
          });
        this.$router.go(0);
      }
    },
    async accept() {
      if (this.visit.type !== this.type) {
        const alert = await alertController.create({
          cssClass: 'my-custom-class',
          header: 'Suburban Access',
          subHeader: 'Alerta',
          message:
            'El tipo de visita es diferente al tipo de visita del codigo QR. No puede aceptarse la entrada',
          buttons: ['OK'],
        });
        alert.present();
      } else {
        await firebase
          .firestore()
          .collection('visits')
          .doc(this.id)
          .update({
            type: 'salida',
          });
        this.$router.push({ name: 'Admin' });
      }
    },
    async acceptExit() {
      if (this.visit.type !== this.type) {
        const alert = await alertController.create({
          cssClass: 'my-custom-class',
          header: 'Suburban Access',
          subHeader: 'Alerta',
          message:
            'El tipo de visita es diferente al tipo de visita del codigo QR. No puede aceptarse la salida',
          buttons: ['OK'],
        });
        alert.present();
      } else {
        this.$router.push({ name: 'Admin' });
      }
    },
    goHome() {
      this.$router.push({name: 'Admin'});
    },
    changeName(e) {
      this.visit.name = e.target.value;
    },
    changeLastName(e) {
      this.visit.lastname = e.target.value;
    },
    changePlate(e) {
      this.visit.plate = e.target.value;
    },
  },
});
</script>

<style></style>
