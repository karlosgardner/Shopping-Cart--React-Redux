"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {winesReducers} from './winesReducers';
import {cartReducers} from './cartReducers';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  wines: winesReducers,
  cart: cartReducers
})
