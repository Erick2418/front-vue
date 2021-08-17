<template>
  <v-app id="inspire">
   
    <v-navigation-drawer  v-model="drawer"
      app >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Hotel
          </v-list-item-title>
       
       
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
           :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

          <v-list-item  @click="loginGo">

          <v-list-item-icon>
            <v-icon> mdi-login </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>  
                  
        </v-list-item>







          <v-list-item @click="logout"  to="/login">

          <v-list-item-icon>
            <v-icon> mdi-logout </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>  

        </v-list-item>






      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      
    </v-app-bar>

    <v-main>
       <router-view></router-view>


    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
 export default {

    data: () => ({ 
      drawer: null,
       items: [
         { title: 'Users', icon: 'mdi-account-group',to:'/users'  },
          { title: 'Registrar Usuario', icon: 'mdi-account-plus',to:'/editUser'  },
          { title: 'Reservaciones', icon: 'mdi-note-text',to:'/revervaciones'  },
           { title: 'Registrar Reservacion', icon: 'mdi-note-plus',to:'/registrorever'  },
          // { title: 'Login', icon: 'mdi-login' ,to:'/login' },
            // { title: 'Logout', icon: 'mdi-logout',to:'/login'},
        ],
        right: null,
        isLogin:localStorage.getItem('x-token')||undefined,
    }),
    beforeMount(){
    
    
          // if(this.isLogin==undefined){
             
          //    router.push('/')
          // }
          
          
          // this.isLogin=  localStorage.getItem('x-token')||"";
    },
   methods:{
      logout(){
        this.$store.state()
         axios.defaults.headers.common['x-token'] ="";
         localStorage.removeItem('x-token');  
         localStorage.removeItem('id-user');  
        
      },

    loginGo(){
      
     if (!(localStorage.getItem('x-token') === undefined || localStorage.getItem('x-token') === null)) {
        Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Ya tiense una sesion',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      }else{
         router.push('/')
      }
    
    }



    },
    

    
  }
</script>
