// State
export interface ClienteState{
    clientes: Cliente[],
    cliente:Cliente
}
export interface AuthState{
    authUsu: authUsuario,
    loginUsuario:authLogin,
}
export interface ReservacionState{
    reservaciones: Reservacion[],
    reservacion:Reservacion
}




// Models
export interface Cliente{
    email: string,
    name: string,
    fecha_nacimiento: string,
    cedula: string, 
    cellphone: string, 
    
}


export interface authUsuario{
    email: string,
    password:string,
}
export interface authLogin{
    id: string,
    email:string,
}


export interface Reservacion{
    fecha_entrada:string ,
    fecha_salida:string,
    costo: string ,
    num_habitacion:string,
    cliente: string ,
  
    
}




