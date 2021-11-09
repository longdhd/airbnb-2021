import {combineReducers} from 'redux';
import {LoadingReducer} from './LoadingReducer';
import {SearchReducer} from './SearchReducer';


const reducer = combineReducers({
    LoadingReducer,
    SearchReducer
})

export default reducer