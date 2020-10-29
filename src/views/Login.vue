<template>
  <ion-card>
      
    <img src="../../public/assets/icon/SA.png" />
      
    <ion-item>
      <ion-label position="floating">User</ion-label>
      <ion-input v-model="User.usuario" type="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input v-model="User.contra" type="password"></ion-input>
    </ion-item>
    <ion-button v-on:click="IniciarSesion" expand="block"
      >Iniciar sesion</ion-button
    >
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  alertController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default defineComponent({
  name: 'Login',
  components: {
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  data() {
    return {
      User: {
        usuario: '',
        contra: '',
      },
      error: '',
      // UsuarioRegistrado:[
      //     {
      //         Usuario: 'Jose',
      //         Password: 'Moviles'
      //     },
      //     {
      //         Usuario: 'Admin',
      //         Password: 'Admin'
      //     }
      // ]
    };
  },
  methods: {
    async IniciarSesion() {
      // console.log(this.User);
      // let Inicio = 0
      // for (const Usuario in this.UsuarioRegistrado){
      //     if(this.UsuarioRegistrado[Usuario].Usuario == this.User.usuario && this.UsuarioRegistrado[Usuario].Password == this.User.contra ){
      //         Inicio = 1
      //         this.$router.push('Home')
      //     }
      // }
      // if (Inicio != 1){
      //     const Estatus = 'Usuario o Contraseña incorrectos'
      //     this.presentAlert(Estatus)
      // }
      if (this.User.usuario === '' || this.User.contra === '') {
        const status = 'Por favor llena todos los campos';
        return this.presentAlert(status);
      }

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.User.usuario, this.User.contra);
        await this.$router.push('Home');
      } catch (error) {
        const status = error;
        return this.presentAlert(status);
      }
    },
    async presentAlert(Mensaje: any) {
      const alert = await alertController.create({
        cssClass: 'my-custom-class',
        header: 'Suburban Access',
        subHeader: 'Estatus',
        message: Mensaje,
        buttons: ['OK'],
      });
      return alert.present();
    },
  },
});
</script>

<style scoped></style>
