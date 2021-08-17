

import {GetterTree,MutationTree,ActionTree} from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ReservacionState } from '../../types/types';

type ReservacionGetter = GetterTree<ReservacionState, any>

const state: ReservacionState = {

    reservaciones: [
            {
                fecha_entrada:"",
                fecha_salida:"",
                costo:"",
                num_habitacion:"",
                cliente:"",
            }
    ],

    reservacion:{
                fecha_entrada:"",
                fecha_salida:"",
                costo:"",
                num_habitacion:"",
                cliente:"",
    },
}

const getters: ReservacionGetter={

    getReservaciones: state=>state.reservaciones,
    getReservacion: state=>state.reservacion,

}

const mutations: MutationTree<ReservacionState>={

    addClientes(state,newReserva){
        // console.log(newReserva);
        state.reservaciones=newReserva;
    },

    addCliente(state,newReserva){
        state.reservacion=newReserva;        
    }
}

const actions: ActionTree<ReservacionState,any>={

    async getReservassApi ({commit}){

        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.get('http://localhost:3000/api/reservacion',{
            }).then(({data}) => {
                console.log(data);
                commit('addClientes',data.reservacion);
            
            });
            

        } catch (error) {
            console.log(error);
        }

    },

    async getONEReservacionAsync ({commit},id:string){
            
        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.get('http://localhost:3000/api/reservacion/'+id)
            
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

    async EditReservacion ({commit},data){
        console.log('EDIT RESERVACION')
        const ids= data.id;
        delete data.id;

        let datos={};
        
            datos={
                "fecha_entrada": data.fecha_entrada,
                "fecha_salida": data.fecha_salida,
                "num_habitacion": data.num_habitacion,
                "costo":data.costo,
            }
        
        let apiUsuarios;
      
        try {

            apiUsuarios = await axios.put('http://localhost:3000/api/reservacion/'+ids,
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



        async RegisterReservacion ({commit},data){

        let apiUsuarios;

        try {

            apiUsuarios = await axios.post('http://localhost:3000/api/reservacion',
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
    

    async deleteReservacionAsync ({commit},id:string){
            
        let apiUsuarios;
        
        try {

            apiUsuarios = await axios.delete('http://localhost:3000/api/reservacion/'+id).then(({data}) => {
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


export const reservacion = {
    state,
    getters,
    mutations,
    actions
  }