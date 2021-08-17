<template>
  <div class="ma-16" >
  
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
       :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
       :rules="[rules.required]"
       :type="show3 ? 'text' : 'password'"
       name="input-10-2"
       v-model="password"
       label="Password"
       hint="At least 8 characters"
       class="input-group--focused"
       @click:append="show3 = !show3"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
     @click="validate"
    >
      Login
    </v-btn>

  </v-form>
  
</div>
</template>

<script lang="ts">

  import router from '@/router';
import { authUsuario } from '@/types/types';
import Swal from 'sweetalert2';
import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import {State, Getter,Mutation,Action } from 'vuex-class'
  // import HelloWorld from '../components/HelloWorld.vue'
@Component
export default class Home extends Vue {
    
   
   
    // @Mutation addAuthUsu:any;
    @Action LoginClienteAsync:any;

   //DATA
    show3= false
    valid= true
    password= ''
    rules= {
        required: (value:string) => !!value || 'Required.',
    }
    email= ''
    emailRules= [
        (v:string) => !!v || 'E-mail is required',
        (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]


      
    async validate () {
        // console.log({email:this.email,password:this.password});
        
    //   this.addAuthUsu({email:this.email,password:this.password});
      await this.LoginClienteAsync({email:this.email,password:this.password});          
    }
}

</script>
