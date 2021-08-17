<template>
    <div class="pa-16" style="max-width:100vh;">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >        
            <!-- <v-text-field
            v-model="fecha_entrada"
            :counter="10"
            :rules="fecha_entradaRules"
            label="fecha_entrada"
            required
            ></v-text-field> -->
            <p>Fecha Inicio</p>
            <input type="date" id="date-input" v-model="fecha_entrada"  value="DD-MM-YYY" forma  required />

            <!-- <v-text-field
            v-model="fecha_salida"
            :rules="fecha_salidaRules"
            label="fecha_salida"
            required
            ></v-text-field>
 -->

            <p>Fecha Salida</p>
            <input type="date" id="date-input"  v-model="fecha_salida" value="DD-MM-YYY" forma  required />



            <v-text-field
            v-model="num_habitacion"
            :counter="10"
            :rules="num_habitacionRules"
            label="num_habitacion"
            type="number"
            required
            ></v-text-field>

            <v-text-field
            v-model="costo"
            :counter="10"
            :rules="costoRules"
            label="costo"
            type="number"
            required
            ></v-text-field>
            <v-btn
            color="warning"
            @click="submit"
            >
            Registrar
            </v-btn>
           
        </v-form>
        
    </div>
  
</template>


<script lang="ts">
import router from '@/router';
import { Cliente, Reservacion } from '@/types/types'
import Swal from 'sweetalert2';
import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
import { filter } from 'vue/types/umd';
  import {State, Getter,Mutation,Action } from 'vuex-class'
@Component
export default class Register extends Vue {

 @Action RegisterReservacion:any;
@Action getONEReservacionAsync:any;
 @Getter getReservacion!: Reservacion;
    @Action EditReservacion:any;
 
  paramss:string=this.$route.params.id;
    
    
    fechaactual:any
    show3= false
      isRegister:boolean=false;
      valid= false
      fecha_entrada= ''
      fecha_entradaRules= [
        (v:string) => !!v || 'fecha_entrada is required',//esto es para que no sea undefine
    
      ]


      fecha_salida= ''
      fecha_salidaRules= [
        (v:string)  => !!v || 'fecha_salida is required',
      
      ]
      num_habitacion= ''
      num_habitacionRules=[
        (v:number)  => !!v || 'num_habitacion is required',
      ]
    costo=5
    costoRules=[
        (v:number)  => !!v || 'costo is required',
      ]
      select= null
      checkbox= false


    async traerClientes(){
         await this.getONEReservacionAsync(this.paramss);
          const variabless=this.getReservacion;

            this.fecha_entrada= variabless.fecha_entrada
            this.fecha_salida= variabless.fecha_salida
            this.num_habitacion= variabless.num_habitacion
            this.costo=  Number(variabless.costo)
      console.log(variabless);
      
    }
    
    
    beforeCreate(){
      
     if (localStorage.getItem('x-token') === undefined || localStorage.getItem('x-token') === null) {
        this.$router.push('/login');
          Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debes inicar sesion',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      }
         
           
    }

    mounted(){ /// verificamos si evamos a editar o vamos a reitrar un cliente nuevo 
      console.log('antes que me cree');
      this.fechaactual=new Date();
      if(this.paramss==undefined){
          this.isRegister=true;
      }else{
        this.isRegister=false;
         this.traerClientes();
      }
    }
     
      async submit () { //RECIERDA ENVIAR EL ID DEL USUARIO QUE ESTA REGISTRANDO ESTO
          // id= localStorage.getItem('id-user');
          let idUsuario=  localStorage.getItem('id-user');
         const registro={
          fecha_entrada: this.fecha_entrada ,
          fecha_salida: this.fecha_salida ,
          num_habitacion: this.num_habitacion, 
          costo:this.costo,
          cliente: idUsuario,
        }
        console.log(registro);
        if(this.isRegister){ // si es true entonces si estamos registrando uno nuevo                
                await this.RegisterReservacion(registro);

        }else{// entonces estamos editando
            await this.EditReservacion(registro);
        }
       
     
      }
  
  
    
}
</script>



