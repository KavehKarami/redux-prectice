// NOTE middleware is the piece of code that get exected "after an action is dispatched" and "before is reached the root reducer"
// NOTE store is a same with store but it only have a getState and dispatch method
// NOTE next is works like next in node.js; if this is one middleware that we have, next is a root reducer; but if we have a multiple middleware, next is a NEXT middleware
// NOTE action is your redux action

const logger = (param) => (store) => (next) => (action) => {
  console.log("param: ", param);
  console.log("store: ", store);
  console.log("next: ", next);
  console.log("action: ", action);
  next(action);
};

export default logger;
