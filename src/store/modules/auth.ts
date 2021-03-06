import {GetterTree,MutationTree,ActionTree} from 'vuex';
import axios from 'axios';
import { AuthState } from '../../types/types';
import Swal from 'sweetalert2';
import router from '@/router';

type UserGetter = GetterTree<AuthState, any>

const state: AuthState = {

    authUsu:{nameUsu:''},
    
    loginUsuario:{id:'',email:''}

}

const getters: UserGetter={

   
  getAuthUSU: state=>state.authUsu.nameUsu,

    getLoginUsu: state=>state.loginUsuario,

}

const mutations: MutationTree<AuthState>={

    addAuthUsu(state,newUser){
        state.authUsu=newUser;          
    },
    addLoginUsu(state,newUser){
    
      state.loginUsuario=newUser;  
    },
    addUSER(state,newUser){
    
      state.authUsu=newUser;  
    },

}

const actions: ActionTree<AuthState,any>={

    async LoginClienteAsync ({commit},data){
        let apiAuth;
        try {
          apiAuth = await axios.post('http://localhost:3000/api/cliente/login',
          data)
          .then(({data}) => {
  
            localStorage.setItem('x-token',JSON.stringify(data.token));
            localStorage.setItem('id-user',JSON.stringify(data.id));
            axios.defaults.headers.common['x-token'] = data.token;
           
            console.log(data);
            commit('addLoginUsu',{ id:data.id, email:data.user });
            commit('addAuthUsu',data.name);
            router.push('/');
          });
  
        }catch (error) {
          apiAuth = error.response;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text :apiAuth.data.msg+ ",intente nuevamente",
  
          })
        }

    }


}


export const auth = {
    state,
    getters,
    mutations,
    actions
  }









