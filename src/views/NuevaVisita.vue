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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Registro de Visita</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
    <div id="container">
      <ion-title v-if="error" style="color: #db4141;">
        {{ error }}
      </ion-title>
      <ion-card>
        <ion-item>
          <ion-label position="floating">Nombre</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Apellidos</ion-label>
          <ion-input v-model="lastName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Placa</ion-label>
          <ion-input v-model="plate"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Fecha de acceso</ion-label>
          <ion-datetime
            display-format="YYYY-MM-DD"
            v-model="date"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Hora de acceso</ion-label>
          <ion-datetime display-format="HH-mm" v-model="time"></ion-datetime>
        </ion-item>
        <ion-button @click="newVisit">
          Registrar visita
        </ion-button>
      </ion-card>
    </div>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonInput,
  IonButton,
  IonDatetime,
  alertController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonItem,
    IonLabel,
    IonBackButton,
    IonButtons,
    IonInput,
    IonButton,
    IonDatetime,
  },
  data() {
    return {
      name: '',
      lastName: '',
      plate: '',
      date: '',
      time: '',
      userId: '',
      error: '',
      fecha: '',
      hora: '',
      fh: '',
    };
  },
  // mounted() {
  //   const date: Date = new Date();
  //   const fecha =
  //     date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate();
  //   console.log(fecha);
  //   console.log(date);
  // },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = '';
      }
    });
    const date: Date = new Date();
    this.fecha =
      date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate();
    this.hora = (date.getHours() + ':' + date.getMinutes()).toString();

    console.log(this.fecha);
    console.log(this.hora);
  },
  methods: {
    Registro() {
      this.$router.push('NuevaVisita');
    },
    async newVisit() {
      if (
        !this.name ||
        !this.lastName ||
        !this.plate ||
        !this.date ||
        !this.time
      ) {
        this.error = 'Por favor llena todos los campos';
        const alert = await alertController.create({
          cssClass: 'my-custom-class',
          header: 'Suburban Access',
          subHeader: 'Alerta',
          message: 'Por favor llena todos los campos',
          buttons: ['OK'],
        });
        alert.present();
      } else {
        if (this.time == undefined || this.date == undefined) {
          const alert = await alertController.create({
            cssClass: 'my-custom-class',
            header: 'Suburban Access',
            subHeader: 'Alerta',
            message: 'Por favor llena todos los campos',
            buttons: ['OK'],
          });
          return alert.present();
        }
        this.date = this.date.split('T')[0];
        this.time = this.time.split('T')[1];
        this.time = this.time.split(':')[0] + ':' + this.time.split(':')[1];
        if (this.date >= this.fecha) {
          // console.log(
          //   'name: ' + this.name,
          //   'lastname: ' + this.lastName,
          //   'plate: ' + this.plate,
          //   'fecha: ' + this.date,
          //   'hora: ' + this.time
          // );
          await firebase
            .firestore()
            .collection('visits')
            .doc()
            .set({
              name: this.name,
              lastname: this.lastName,
              plate: this.plate,
              date: this.date,
              time: this.time,
              userId: this.userId,
              type: 'entrada',
            });
          this.$router.push('Home');
        } else {
          this.error =
            'Fecha Invalida. Selecciona una fecha actual o posterior';
          const alert = await alertController.create({
            cssClass: 'my-custom-class',
            header: 'Suburban Access',
            subHeader: 'Alerta',
            message: 'Fecha Invalida. Selecciona una fecha actual o posterior',
            buttons: ['OK'],
          });
          alert.present();
        }
      }
    },
  },
});
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
