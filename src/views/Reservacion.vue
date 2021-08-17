<template>
<div>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr class="light-blue darken-2">
            <th class="white--text text-center">id</th>
           <th class="white--text">fecha_entrada</th>
           <th class="white--text">fecha_salida</th>
            <th class="white--text">costo</th>
            <th class="white--text">num_habitacion</th>
          
            <th class="white--text text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.indexOf"
        >
          <th>{{item.id}}</th>
          <th>{{item.fecha_entrada}}</th>
          <th>{{item.fecha_salida}}</th>
          <th>{{item.costo}}</th>
          <th>{{item.num_habitacion}}</th>
        
        
           <td>

             <v-btn   class="mx-2" fab dark small color="green" @click="formEditar(item.id,item.fecha_entrada,item.fecha_salida,item.costo,item.num_habitacion)">
                 <v-icon dark>
                   mdi-file-edit
                </v-icon>
              </v-btn>

            <v-btn   class="mx-2" fab dark small color="red" @click="borrar(item.id)">
                 <v-icon dark>
                  mdi-delete
                </v-icon>
            </v-btn>


          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>


</template>


<script lang="ts">

  import router from '@/router';
import Swal from 'sweetalert2';
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import {State, Getter,Mutation,Action } from 'vuex-class'
  import { Reservacion} from './../types/types'

@Component
  export default class About extends Vue {


    @Getter getReservaciones!: Reservacion[]


    @Action getReservassApi:any;


    @Action deleteReservacionAsync:any;

    
    items:any=[]// lo agrego desde el mounted, con el metodo setusertable


    async created() {
      await this.getReservassApi(); //traigo a los usuarios de axios
      //  this.addUsers();//traigo los usaruios
     this.handleUsersItems(); // monto los items en la tabla
    }
        
      async borrar(id:string){
        
         await this.deleteReservacionAsync(id);

           await this.getReservassApi(); //traigo a los usuarios de axios
          this.handleUsersItems(); // monto los items en la tabla
       }

      formEditar(user:any){
        console.log(user);
      

       
        // console.log(user);
         router.push('/editrever/'+user);
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
    handleUsersItems(){

      this.items=this.getReservaciones;

    }

  }



</script>


