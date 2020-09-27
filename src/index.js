// import "./Functional/index";
import store from "./store";
import { bugAdded, bugRemoved } from "./actions";

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("bug1"));
store.dispatch(bugAdded("bug2"));
store.dispatch(bugRemoved(2));

unsubscribe();
