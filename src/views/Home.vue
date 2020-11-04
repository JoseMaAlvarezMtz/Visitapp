<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Suburban Access</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Suburban Acces</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
    <div id="container">
      <ion-list>
        <ion-item v-on:click="Registro" detail>
          <ion-label>Registrar visita</ion-label>
        </ion-item>
    
        <ion-item detail v-on:click="bitacora">
          <ion-label>Bitacora de entradas</ion-label>
        </ion-item>

        <ion-item detail v-on:click="logout">
          <ion-label>Cerrar sesión</ion-label>
        </ion-item> 
      </ion-list>
    </div>
    
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel  } from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel
  },
  methods:{
    Registro(){
      this.$router.push('NuevaVisita')
    },
    bitacora() {
      this.$router.push('/bitacoras');
    },
    async logout() {
      try {
        await firebase.auth().signOut();
        await this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
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

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>