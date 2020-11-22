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
    <ion-content :fullscreen="true" style="background: none transparent;">
      <ion-title>Scanner</ion-title>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="scan">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { useBackButton } from '@ionic/vue';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { camera } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  methods: {
    scan() {
      QRScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            QRScanner.show();
            (window.document.querySelector(
              'ion-app'
            ) as HTMLElement).style.opacity = '0';
            const scanSub = QRScanner.scan().subscribe((text: string) => {
              const id = text.split('/')[0];
              const type = text.split('/')[1];
              // alert(text + ' ' + id + ' ' + type);
              (window.document.querySelector(
                'ion-app'
              ) as HTMLElement).style.opacity = '1';
              scanSub.unsubscribe();
              this.$router.push({
                name: 'Visita',
                params: { visitId: id },
                query: { type: type },
              });
              QRScanner.hide();
            });
            useBackButton(0, () => {
              (window.document.querySelector(
                'ion-app'
              ) as HTMLElement).style.opacity = '1';
              scanSub.unsubscribe();
            });
          } else if (status.denied) {
            QRScanner.openSettings();
          } else {
            alert('Por favor da el permiso para la camara para poder escanear');
          }
        })
        .catch((e: any) => {
          alert('El error es: ' + e);
        });
    },
  },
  setup() {
    return {
      camera,
    };
  },
});
</script>

<style></style>
