import {legacy_createStore as createStore} from 'redux'
import { reducer } from './reducer';
import { AppState } from './app-state';

export const store = createStore(reducer, new AppState());