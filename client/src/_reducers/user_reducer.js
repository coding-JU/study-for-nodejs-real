import{
    LOGIN_USER, 
    REGISTER_USER
} from '../_actions/types'

                        //현재 state 비어있음
export default function (state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            //스프레드 오퍼레이트 (state 최초상태 가져옴)
            return{...state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return{...state, register: action.payload}
            break;
        default:
            return state;
    }
}