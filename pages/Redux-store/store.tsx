import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const initialState = {
  dataLogin: [],
  dataRegister: [],
  cout: 99,
};

const rootReducer: any = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        dataLogin: action.payload,
      };
    case "SET_REGISTER":
      return {
        ...state,
        dataRegister: action.payload,
      };
      case 'SET_LOGIN_FAILED':
        return {
            ...state,
            dataLogin: action.payload,
        };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
