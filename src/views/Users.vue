<template>
<div>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr class="light-blue darken-2">
            <th class="white--text text-center">id</th>
           <th class="white--text">email</th>
           <th class="white--text">name</th>
            <th class="white--text">fecha_nacimiento</th>
            <th class="white--text">cedula</th>
            <th class="white--text">cellphone</th>
            <th class="white--text text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.indexOf"
        >
         <th>{{item.id}}</th>
          <th>{{item.email}}</th>
          <th>{{item.name}}</th>
          <th>{{item.fecha_nacimiento}}</th>
          <th>{{item.cedula}}</th>
          <th>{{item.cellphone}}</th>
           <td>
              <v-btn   class="mx-2" fab dark small color="green" @click="formEditar(item.id,item.fecha,item.correo,item.telefono,item.sueldo)">
                 <v-icon dark>
                  mdi-account-edit
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
  import {Cliente} from './../types/types'

@Component
  export default class About extends Vue {

    @State clientes!: Cliente[];
      // items=[]
 @State cliente!: Cliente;
    @Getter getClientes!: Cliente[]
// addUsers
    // @Mutation addUsers:any;

    @Action getUsersApi:any;


    @Action deleteClienteAsync:any;

    
    items:any=[]// lo agrego desde el mounted, con el metodo setusertable

    async created() {

      await this.getUsersApi(); //traigo a los usuarios de axios
      //  this.addUsers();//traigo los usaruios
     this.handleUsersItems(); // monto los items en la tabla
    }

      async borrar(id:string){
        
         await this.deleteClienteAsync(id);

           await this.getUsersApi(); //traigo a los usuarios de axios
          this.handleUsersItems(); // monto los items en la tabla
       }

      formEditar(user:any){
        console.log(user);
         router.push('/editUser/'+user);
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
      this.items=this.getClientes;
    }

  }



</script>