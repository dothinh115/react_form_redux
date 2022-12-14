import {configureStore} from '@reduxjs/toolkit'; 
import {formConfig} from './reducers/formConfig';
import { mainData } from './reducers/userReducers';

const store = configureStore({
    reducer: {
        data: mainData,
        formConfig: formConfig,
        search: (state = "", action) => {
            switch(action.type) {
                case "TIM_KIEM_USER": {
                    state = action.payload;
                    return state;
                }
                default: return state;
            }
        }
    }
});

export default store;