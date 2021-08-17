<template>
    <div class="pa-16" style="max-width:100vh;">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="name"
            required
            ></v-text-field>

            <!-- <InputDate/> -->

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>


            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              name="input-10-2"
              v-model="password"
              label="Password"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>


            <v-text-field
            v-model="cellphone"
            :counter="10"
            :rules="cellphoneRules"
            label="Telefono"
            
            required
            ></v-text-field>

            <p>Fecha de nacimiento</p>
            <input type="date" id="date-input" v-model="fecha_cumple"  value="DD-MM-YYY" forma  required />


            <v-text-field
            v-model="cedula"
            :counter="10"
            :rules="cedulaRules"
            label="cedula"
           
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
import { Cliente } from '@/types/types'
import Swal from 'sweetalert2';
import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
import { filter } from 'vue/types/umd';
  import {State, Getter,Mutation,Action } from 'vuex-class'
@Component
export default class Register extends Vue {

 @Action RegisterCliente:any;
@Action getONEClienteAsync:any;
 @Getter getCliente!: Cliente;
    @Action EditCliente:any;

  paramss:string=this.$route.params.id;
    
    
    fecha_cumple="12/12/12"
    show3= false
      isRegister:boolean=false;

      valid= true;

      name= ''
      nameRules= [
        (v:string) => !!v || 'Name is required',//esto es para que no sea undefine
        (v:string)  => (v && v.length <= 15) || 'Name must be less than 15 characters',
        (v:string) =>  /[A-Za-z ]+/.test(v) ||  'Not number'
      ]
      password=''

      email= ''
      emailRules= [
        (v:string)  => !!v || 'E-mail is required',
       (v:string)  => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
      cedula= ''
      cedulaRules=[
        (v:string)  => !!v || 'Sueldo is required',
        (v:string)  => /[0-9]+/.test(v) || 'Sueldo must be valid',
      ]
      cellphone= ''
      cellphoneRules= [
        (v:string)  => !!v || 'Telefono is required',
        (v:string)  => /[0123456789]{1,9}/.test(v) || 'Telefono must be valid',
      ]
      select= null
      checkbox= false


    async traerClientes(){
         await this.getONEClienteAsync(this.paramss);
          const variabless=this.getCliente;
         
         
            this.name= variabless.name
            this.email= variabless.email
            this.cellphone= variabless.cellphone
            this.cedula= variabless.cedula
            this.fecha_cumple= variabless.fecha_nacimiento
          // console.log(variabless)
        //   this.firstname=this.getUser.firstname;
        //   this.correo=this.getUser.correo;
        //   this.telefono=this.getUser.telefono;
        //   this.sueldo=this.getUser.sueldo;
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
      if(this.paramss==undefined){
          this.isRegister=true;
      }else{
        this.isRegister=false;
         this.traerClientes();
      }
    }
     
      async submit () {
        
        
         const user={
          name: this.name,
          password: this.password,
          fecha_nacimiento: this.fecha_cumple, 
          email: this.email,
          cellphone: this.cellphone,
          cedula: this.cedula,
          id:this.paramss
        }
        if(this.isRegister){ // si es true entonces si estamos registrando uno nuevo                
                await this.RegisterCliente(user);

        }else{// entonces estamos editando
            await this.EditCliente(user);
        }
       
     
      }
  
  
    
}
</script>


