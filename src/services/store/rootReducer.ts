import { combineReducers } from "redux";
// import slices
import horseMedicalReducer from "../store/modules/horseMedical";
import authSliceReducer from "./modules/auth";
import historyReducer from "./modules/history";
import horsesSliceReducer from "./modules/horses";
import locationsReducer from "./modules/locations";
import netInfoReducer from "./modules/netInfo";
import offlineQueueReducer from "./modules/offlineQueue";
import personsReducer from "./modules/persons";
import protocolsReducer from "./modules/protocols";
import runnersResultReducer from "./modules/runnersResult";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  horses: horsesSliceReducer,
  horseMedical: horseMedicalReducer,
  locations: locationsReducer,
  netInfo: netInfoReducer,
  offlineQueue: offlineQueueReducer,
  protocols: protocolsReducer,
  history: historyReducer,
  persons: personsReducer,
  runnersResult: runnersResultReducer,
});

export default rootReducer;
