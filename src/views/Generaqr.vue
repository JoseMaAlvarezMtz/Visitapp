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
          <ion-input v-model="qrText" @load="generateQrCode" readonly="true">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-img id="qr-code" :src="qrSrc"></ion-img>
        </ion-item>
        <ion-button @click="generateQrCode" v-if="alreadyQR === false">Generar QR</ion-button>
        <ion-button @click="shareQR" v-if="alreadyQR === true">Compartir codigo</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { Plugins } from '@capacitor/core';
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

const { FileSharer } = Plugins;

export default defineComponent({
  props: ['visit'],
  data() {
    return {
      qrText: '',
      qrSrc: null,
      alreadyQR: false,
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
      qrCode.toCanvas(this.qrText, { type: 'image/png' }, this.createObjectUrl);
      this.alreadyQR = true;
    },
    openInNewWindow() {
      window.open(this.qrSrc);
    },
    reset() {
      window.URL.revokeObjectURL(this.qrSrc);
      this.qrSrc = null;
      this.qrText = '';
    },
    async shareQR() {
      const url = window.document.querySelector('#qr-code').src;

      const convertToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });

      fetch(url).then(res => res.blob()).then(async blob => {
        const base64 = await convertToBase64(blob);
        const image = base64.split(',')[1];
        FileSharer.share({
          filename: 'qrcode.png',
          base64Data: image,
          contentType: 'image/png'
        })
      }).catch(e => console.log(e));
    },
  },
});
</script>
