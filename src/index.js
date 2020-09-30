import configureStore from "./store/configureStore";
import { loadBugs, addBug, resolvedBug, assignedBug } from "./store/bugs";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// UI layer
store.dispatch(loadBugs());
// store.dispatch(addBug({ description: "online test" }));
store.dispatch(assignedBug(12, "5f7331cd2eb39239a4c04703"));

setTimeout(() => store.dispatch(loadBugs()), 2000);

unsubscribe();
