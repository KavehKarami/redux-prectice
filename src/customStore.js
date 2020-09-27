import reducer from "./reducer";

function customStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let i in listeners) listeners[i]();
  }

  function getState() {
    return state;
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default customStore(reducer);
