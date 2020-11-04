<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Suburban Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <img src="../../public/assets/icon/SA.png" alt="" />
      <ion-title>Registrar usuario</ion-title>
      <ion-item>
        <ion-label position="floating">User</ion-label>
        <ion-input v-model="registerUser.usuario" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="registerUser.contra" type="password"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Role</ion-label>
        <ion-select
          v-model="role"
          interface="action-sheet"
          ok-text="Ok"
          cancel-text="Cancelar"
        >
          <ion-select-option value="user">User</ion-select-option>
          <ion-select-option value="admin">Admin</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-button v-on:click="registrar" expand="block"
        >Registrar usuario</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default defineComponent({
  data() {
    return {
      registerUser: {
        usuario: '',
        contra: '',
      },
      role: 'user',
      userId: '',
    };
  },
  components: {
    IonPage,
    IonContent,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSelect,
    IonSelectOption,
  },
  methods: {
    async registrar() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerUser.usuario,
          this.registerUser.contra
        );
      firebase.auth().onAuthStateChanged(async(user) => {
        if (user) {
          this.userId = user.uid;
          console.log(this.userId);
          await firebase
            .firestore()
            .collection('users_roles')
            .doc()
            .set({
              userId: this.userId,
              role: this.role,
            });
          this.$router.push('/admin');
        } else {
          this.userId = '';
        }
      });
      this.registerUser.usuario = '';
      this.registerUser.contra = '';
    },
  },
});
</script>

<style scoped></style>
