import Axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "./../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await Axios({
      baseURL: "http://localhost:8000/api",
      url,
      method,
      data,
    });
    //general
    dispatch(apiCallSuccess(response.data));
    // specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (err) {
    //general
    dispatch(apiCallFailed(err.message));
    // specific
    if (onError) dispatch({ type: onError, payload: err.message });
  }
};

export default api;
