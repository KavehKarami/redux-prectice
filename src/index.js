// import "./Functional/index";
import store from "./store";
import { BUG_ADDED, BUG_REMOVED } from "./actionTypes";

let unsubscribe = store.subscribe(() => {
  console.log("hi", store.getState());
});

store.dispatch({
  type: BUG_ADDED,
  payload: {
    description: "bug1",
  },
});
store.dispatch({
  type: BUG_ADDED,
  payload: {
    description: "bug2",
  },
});
store.dispatch({
  type: BUG_REMOVED,
  payload: {
    id: 2,
  },
});

console.log(store.getState());

unsubscribe();
