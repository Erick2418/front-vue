import axios from "axios";

export const traertoken= ()=>{
    let algoo=  localStorage.getItem('x-token');
    if(algoo){
      // console.log();
      // console.log('aaaaaa')
      axios.defaults.headers.common['x-token'] =JSON.parse(algoo);
    }
}
