import { combineReducers } from 'redux';
//1.combineReducers를 redux에서 가져와서 
import user from './user_reducer';
//import comment form './comment_reducer';

const rootReducer = combineReducers({
//2.combineReducers를 이용해서 rootReducer에 합쳐준다
    user
    //comment
})

export default rootReducer;