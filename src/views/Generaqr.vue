<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Compartir Qr</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-item>
          <ion-label>{{ visit }}</ion-label>
          <ion-input
            v-model="qrText"
            @load="generateQrCode"
            readonly="true"
          >
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-img :src="qrSrc"></ion-img>
        </ion-item>
        <ion-button @click="generateQrCode">Generar QR</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import qrCode from 'qrcode';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonLabel,
  IonInput,
  IonImg,
  IonItem,
  IonButton,
} from '@ionic/vue';

export default defineComponent({
  props: ['visit'],
  data() {
    return {
      qrText: '',
      qrSrc: null,
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
    IonLabel,
    IonInput,
    IonImg,
    IonItem,
    IonButton,
  },
  mounted() {
    this.qrText = this.$route.params.visit + '/' + this.$route.query.type;
  },
  methods: {
    createObjectUrl(err, canvas) {
      if (!err) {
        canvas.toBlob((blob) => {
          this.qrSrc = window.URL.createObjectURL(blob);
        });
      } else {
        console.warn('generateQrCode:ERROR', err);
      }
    },
    generateQrCode() {
      //if (!this.qrText) { return }
      window.URL.revokeObjectURL(this.qrSrc);
      qrCode.toCanvas(this.qrText, {}, this.createObjectUrl);
    },
    openInNewWindow() {
      window.open(this.qrSrc);
    },
    reset() {
      window.URL.revokeObjectURL(this.qrSrc);
      this.qrSrc = null;
      this.qrText = '';
    },
  },
});
</script>
