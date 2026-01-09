import { combineReducers } from "redux";
// import slices
import authSliceReducer from "./modules/auth";
import netInfoReducer from "./modules/netInfo";
import protocolsReducer from "./modules/protocols";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  netInfo: netInfoReducer,
  protocols: protocolsReducer,
});

export default rootReducer;
