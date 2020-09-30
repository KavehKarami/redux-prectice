import configureStore from "./store/configureStore";
import { loadBugs } from "./store/bugs";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// UI layer
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(loadBugs()), 2000);

unsubscribe();
