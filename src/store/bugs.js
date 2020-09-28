import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // (action creator & action type) : function(state,action)
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      return bugs.filter((bug) => bug.id !== action.payload.id);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

/* ------------------------ a way with redux toolkit ------------------------ */

// import { createAction, createReducer } from "@reduxjs/toolkit";

// // NOTE Action Creators
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // NOTE Reducer
// let lastId = 0;

// export default createReducer([], {
//   // action: function(state,action){}

//  [bugAdded.type]: (bugs, action) => {
//    bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//    });
//  },

//  [bugRemoved.type]: (bugs, action) => {
//    return bugs.filter((bug) => bug.id !== action.payload.id);
//  },

//  [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//  },
// });

/* -------------------------------------------------------------------------- */

/* ---------------------- Old Way without redux-toolkit --------------------- */

// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });

// export function bugRemoved(id) {
//   return {
//     type: BUG_REMOVED,
//     payload: {
//       id,
//     },
//   };
// }

// export const bugResolved = (id) => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case BUG_ADDED:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case BUG_REMOVED:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case BUG_RESOLVED:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );

//     default:
//       return state;
//   }
// }

/* -------------------------------------------------------------------------- */
