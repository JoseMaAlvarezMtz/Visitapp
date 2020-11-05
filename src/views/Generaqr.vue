<template>
 <ion-page>
   <ion-card>
     <ion-input v-model="qrText" v-on:keyup.enter="generateQrCode">

     </ion-input>
     <ion-img :src="qrSrc"></ion-img>
   </ion-card>
 </ion-page>
   
</template>


<script>
import qrCode from 'qrcode'
import {IonPage,IonCard,IonInput,IonImg} from '@ionic/vue'

export default {
  data () {
    return {
      qrText: 'Jose Maria Alvarez Martinez',
      qrSrc: null
    }
  },
  
  components : {
    IonPage,IonCard,IonInput,IonImg

  },

  methods: {
    createObjectUrl (err, canvas) {
      if (!err) {
        canvas.toBlob((blob) => {
          this.qrSrc = window.URL.createObjectURL(blob)
        })
      } else {
        console.warn('generateQrCode:ERROR', err)
      }
    },
    generateQrCode () {
      
      //if (!this.qrText) { return }
      console.log("llame el evento")

      window.URL.revokeObjectURL(this.qrSrc)
      qrCode.toCanvas(this.qrText, {}, this.createObjectUrl)
      console.log(this.qrSrc)
    },
    openInNewWindow () {
      window.open(this.qrSrc)
    },
    reset () {
      window.URL.revokeObjectURL(this.qrSrc)
      this.qrSrc = null
      this.qrText = ''
    }
  }
}
</script>