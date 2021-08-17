import axios from "axios";

export const traertoken= ()=>{
    let algoo=  localStorage.getItem('x-token');
    if(algoo){

      axios.defaults.headers.common['x-token'] =JSON.parse(algoo);
    }
}
