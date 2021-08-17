<template>
<div>
  
  <h1>{{name}}</h1>
</div>


  
</template>


<script lang="ts">

  import router from '@/router';
import Swal from 'sweetalert2';
import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import {State, Getter,Mutation,Action } from 'vuex-class'
  import {Cliente} from './../types/types'

@Component
  export default class USERNAME extends Vue {

    @State authUsu!: Cliente;


    @Getter getAuthUSU!: Cliente

    @Mutation addUSER:any;


name:any
 

    
    
    items:any=[]

    
  
    async created() {
        this.name= this.getAuthUSU;
    
    }
        

    

  }



</script>