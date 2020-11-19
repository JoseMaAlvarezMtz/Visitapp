<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import {registerWebPlugin} from '@capacitor/core';
import {FileSharer} from '@byteowls/capacitor-filesharer';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  created() {
    registerWebPlugin(FileSharer);
  }
});
</script>