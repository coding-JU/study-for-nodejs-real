import Axios from 'axios';
import{
    LOGIN_USER,
    REGISTER_USER
} from './types';


export function loginUser(dataToSubmit){
    //서버에서 받은 데이터를 request에 저장
    const request = Axios.post('/api/users/login',dataToSubmit)
        .then(response => response.data)  
        

    return{
        type:LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit){
    //서버에서 받은 데이터를 request에 저장
    const request = Axios.post('/api/users/register',dataToSubmit)
        .then(response => response.data)  

    return{
        type:REGISTER_USER,
        payload: request
    }
}