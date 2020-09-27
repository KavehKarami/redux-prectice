// import "./Functional/index";
import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("bug1"));
store.dispatch(bugAdded("bug2"));
store.dispatch(bugResolved(2));

unsubscribe();
