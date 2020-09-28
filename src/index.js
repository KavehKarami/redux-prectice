// import "./Functional/index";
import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded, projectRemoved } from "./store/projects";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(projectAdded({ name: "Kaveh" }));
store.dispatch(projectAdded({ name: "Kasra" }));
store.dispatch(projectAdded({ name: "alaki" }));
store.dispatch(projectRemoved({ id: 3 }));

store.dispatch(bugAdded({ description: "bug1" }));
store.dispatch(bugAdded({ description: "bug2" }));
store.dispatch(bugResolved({ id: 2 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

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
