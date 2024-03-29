import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./user/reducer";
import vendorReducer from "./vendor/reducer";
import serviceReducer from "./service/reducer";
import bookingReducer from "./booking/reducer";
import adminReducer from "./admin/reducer";
import staffReducer from "./staff/reducer";
import categoryReducer from "./category/reducer";
import bannerReducer from "./banner/reducer";
import tutorialReducer from "./tutorial/reducer";
import videoReducer from "./video/reducer";
import UIReducer from "./ui/reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  vendor: vendorReducer,
  service: serviceReducer,
  booking: bookingReducer,
  admin: adminReducer,
  staff: staffReducer,
  category: categoryReducer,
  banner: bannerReducer,
  tutorial: tutorialReducer,
  video: videoReducer,
  UI: UIReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);

export default store;
