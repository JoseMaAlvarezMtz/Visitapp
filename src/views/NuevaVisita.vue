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
   <ion-card >
       <ion-item>
           <ion-label position="floating">Nombre</ion-label>
           <ion-input></ion-input>
       </ion-item>
       <ion-item>
           <ion-label position="floating">Apellidos</ion-label>
           <ion-input></ion-input>
       </ion-item>
       <ion-item>
           <ion-label position="floating">Placa</ion-label>
           <ion-input></ion-input>
       </ion-item>
       <ion-item>
           <ion-label position="floating">Fecha de acceso</ion-label>
           <ion-input type="date"></ion-input>
       </ion-item>
       <ion-item>
           <ion-label position="floating">Hora de acceso</ion-label>
           <ion-input type="time"></ion-input>
       </ion-item>
   </ion-card>
    </div>
  </ion-page> 
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonBackButton, IonButtons, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';

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
    IonInput
  },
  methods:{
    Registro(){
      this.$router.push('NuevaVisita')
    }
  }

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