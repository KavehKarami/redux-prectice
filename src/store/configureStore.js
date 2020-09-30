// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import thunk from "./middleware/thunk";
import api from "./middleware/api";
import toast from "./middleware/toast";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
    // middleware: [thunk, logger("hello World")],
    // NOTE if we want to add new middlewares, default middleware of "@reduxjs/toolkit" will not worked, to solve this problem we do the line below(adding a getDefaultMiddleware)
    middleware: [...getDefaultMiddleware(), api, toast],
  });
}
