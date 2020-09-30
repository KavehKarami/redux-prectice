import configureStore from "./store/configureStore";
import { loadBugs, addBug } from "./store/bugs";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// UI layer
store.dispatch(loadBugs());
store.dispatch(addBug({ description: "online test" }));

setTimeout(() => store.dispatch(loadBugs()), 2000);

unsubscribe();
