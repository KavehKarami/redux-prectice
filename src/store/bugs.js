import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // (action creator & action type) : function(state,action)

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugRemoved: (bugs, action) => {
      return bugs.list.filter((bug) => bug.id !== action.payload.id);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(
        (bug) => bug._id === action.payload._id
      );
      bugs.list[index] = action.payload;
    },

    bugAssignedToUser: (bugs, action) => {
      const { _id: bugId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug._id === bugId);
      bugs.list[index] = action.payload;
    },
  },
});

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// };

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// Action Creators
const url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMenutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMenutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onSuccess: bugsReceived.type,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) => {
  return apiCallBegan({
    url,
    method: "POST",
    data: bug,
    onSuccess: bugAdded.type,
    onStart: bugsRequested.type,
    onError: bugsRequestFailed.type,
  });
};

export const resolvedBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "PATCH",
    data: { resolved: true },
    onSuccess: bugResolved.type,
    onStart: bugsRequested.type,
    onError: bugsRequestFailed.type,
  });

export const assignedBug = (userId, bugId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "PATCH",
    data: { userId: userId },
    onSuccess: bugAssignedToUser.type,
    onStart: bugsRequested.type,
    onError: bugsRequestFailed.type,
  });

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
