// import "./Functional/index";
import store from "./store";

let unsubscribe = store.subscribe(() => {
  console.log("hi", store.getState());
});

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "bug1",
  },
});
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "bug2",
  },
});

console.log(store.getState());

unsubscribe();
