import configureStore from "./store/configureStore";
import { apiCallBegan } from "./store/api";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(apiCallBegan({ url: "/bugs-api" }));

console.log(store.getState());

unsubscribe();
