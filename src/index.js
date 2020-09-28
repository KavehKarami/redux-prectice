// import "./Functional/index";
import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("bug1"));
store.dispatch(bugAdded("bug2"));
store.dispatch(bugResolved(2));

unsubscribe();

/* ------------------------------ custom store ------------------------------ */
// import store from "./customStore";

// store.subscribe(() => {
//   console.log("State Changed!", store.getState());
// });

// store.dispatch(bugAdded("bug1"));
// store.dispatch(bugAdded("bug2"));
// store.dispatch(bugAdded("bug3"));

// console.log(store.getState());
/* -------------------------------------------------------------------------- */
