<template>
    <ion-card>
        <ion-item>
            <ion-label position="floating">User</ion-label>
            <ion-input v-model="User.usuario"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="User.contra" type="password"></ion-input>
        </ion-item>
        <ion-button v-on:click="IniciarSesion" expand="block">Iniciar sesion</ion-button>
    </ion-card>
</template>

<script lang="ts">
import {IonCard, IonItem, IonLabel, IonInput, IonButton, alertController} from '@ionic/vue'
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Login',
    components: {
        IonCard,
        IonItem,
        IonLabel,
        IonInput,
        IonButton
    },
    data(){
        return{
            User:{
                usuario:'',
                contra:''
            },
            UsuarioRegistrado:[
                {
                    Usuario: 'Jose',
                    Password: 'Moviles'
                },
                {
                    Usuario: 'Admin',
                    Password: 'Admin'
                }
            ]

        }
    },
    methods:{
        IniciarSesion(){
            console.log(this.User);
            let Inicio = 0
            for (const Usuario in this.UsuarioRegistrado){
                if(this.UsuarioRegistrado[Usuario].Usuario == this.User.usuario && this.UsuarioRegistrado[Usuario].Password == this.User.contra ){
                    Inicio = 1
                    this.$router.push('Home')
                }
            }
            if (Inicio != 1){
                const Estatus = 'Usuario o Contraseña incorrectos'
                this.presentAlert(Estatus)
            }
            
        },
        async presentAlert(Mensaje: any) {
            const alert = await alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'VisitApp',
                subHeader: 'Estatus',
                message: Mensaje,
                buttons: ['OK'],
        });
        return alert.present();
    }

    }
})
</script>


<style scoped>

</style>