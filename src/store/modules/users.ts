import { ClienteState } from './../../types/types';
import {GetterTree,MutationTree,ActionTree} from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

type ClienteGetter = GetterTree<ClienteState, any>

const state: ClienteState = {

    clientes: [
        {
            email: "",
            name: "",
            fecha_nacimiento: "",
            cedula: "",
            cellphone: ""
        }
    ],

    cliente:{
        email: "",
        name: "",
        fecha_nacimiento: "",
        cedula: "",
        cellphone: ""
    },
}

const getters: ClienteGetter={

    getClientes: state=>state.clientes,
    getCliente: state=>state.cliente,

}

const mutations: MutationTree<ClienteState>={

    addClientes(state,newUser){
        state.clientes=newUser;
    },

    addCliente(state,newUser){
        state.cliente=newUser;        
    }
}

const actions: ActionTree<ClienteState,any>={

    async getUsersApi ({commit}){

        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.get('http://localhost:3000/api/cliente',{
            }).then(({data}) => {
                commit('addClientes',data.users);
            });


        } catch (error) {
            console.log(error);
        }

    },

    async getONEClienteAsync ({commit},id:string){
            
        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.get('http://localhost:3000/api/cliente/'+id)
            
            .then(({data}) => {

              commit('addCliente',data.results);
            });


        } catch (error) {
            console.log(error)
            const apiUsuario = error.response;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: apiUsuario.data.msg + ", intente nuevamente",
 
            })
        }

    },

    async EditCliente ({commit},data){

        const ids= data.id;
        delete data.id;

        let datos={};
        if(data.password==''){
                console.log('esta vacio: '+data.password)
            datos={
                "name":data.name,
                "email": data.email,
                "cellphone": data.cellphone,
                "cedula":data.cedula,
            }
                
        }else{
            datos={
                "name":data.name,
                "email": data.email,
                "password":data.password,
                "cellphone": data.cellphone,
                "cedula":data.cedula,
                
            }
            console.log('esta lleno: '+data.password)
        }

        
        let apiUsuarios;
      
        try {

            apiUsuarios = await axios.put('http://localhost:3000/api/cliente/'+ids,
            datos
            ).then((data) => {
                console.log(data);
                Swal.fire(
                    'Registro con exito',
                    '',
                    'success'
                  )
            }).catch( err=> {
                const apiUsuario = err.response;
                    console.log(apiUsuario)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: apiUsuario + ", intente nuevamente",
   
                })
            } );
        } catch (error) {
            const apiUsuario = error.response;
           
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: apiUsuario.data.msg + ", intente nuevamente",

             })
        }

    },

        async RegisterCliente ({commit},data){

        let apiUsuarios;

        try {

            apiUsuarios = await axios.post('http://localhost:3000/api/cliente/',
            data
            ).then((data) => {
                console.log(data);
                Swal.fire(
                    'Registro con exito',
                    '',
                    'success'
                  )
            }).catch( err=> {
                const apiUsuario = err.response;
           
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: apiUsuario.data.msg + ", intente nuevamente",
   
                })
            } );
        } catch (error) {
            const apiUsuario = error.response;
           
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: apiUsuario.data.msg + ", intente nuevamente",

             })
        }

    },
    
    async deleteClienteAsync ({commit},id:string){
            
        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.delete('http://localhost:3000/api/cliente/'+id).then(({data}) => {
                Swal.fire(
                    'Elimnacion con exito',
                    '',
                    'success'
                )
            });


        } catch (error) {
            const apiUsuario = error.response;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: apiUsuario.data.msg + ", intente nuevamente",
 
            })
        }

    },


}


export const users = {
    state,
    getters,
    mutations,
    actions
  }
