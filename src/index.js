import configureStore from "./store/configureStore";

const store = configureStore();

let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

unsubscribe();
