// this is our action creators
import { BUG_ADDED, BUG_REMOVED } from "./actionTypes";

export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

export function bugRemoved(id) {
  return {
    type: BUG_REMOVED,
    payload: {
      id,
    },
  };
}
