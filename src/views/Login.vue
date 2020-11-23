<template>
  <ion-page>
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
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
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
import 'firebase/firestore';

export default defineComponent({
  name: 'Login',
  components: {
    IonPage,
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
        firebase.auth().onAuthStateChanged(async(user) => {
          if (user) {
            const querySnapshot = await firebase
              .firestore()
              .collection('users_roles')
              .where('userId', '==', user.uid)
              .get();
            querySnapshot.forEach(doc => {
              if(doc.data().role === 'admin') {
                this.$router.push('Admin');
              } else {
                this.$router.push('Home');
              }
            });
          }
        });
        this.User.usuario = '';
        this.User.contra = '';
        // await this.$router.push('Home');
      } catch (error) {
        const status = error;
        console.log(status);
        if(status.message.includes('The email address is badly formatted.')) {
          return this.presentAlert('Incluya una dirección email valida.');
        }
        if(status.message.includes('There is no user record corresponding to this identifier. The user may have been deleted.') || status.message.includes('The password is invalid or the user does not have a password.')) {
          return this.presentAlert('El usuario y/o la contraseña esta incorrecto.');
        }
        // if(status.message.includes('The password is invalid or the user does not have a password.')) {
        //   return this.presentAlert('El usuario y/o la contraseña esta incorrecto.');
        // }
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
