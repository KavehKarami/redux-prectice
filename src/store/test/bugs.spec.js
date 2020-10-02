import MockAdapter from "axios-mock-adapter";
import Axios from "axios";
import { addBug } from "../bugs";
import configureStore from "./../configureStore";

describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, _id: 1 };

    const fakeAxios = new MockAdapter(Axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(addBug(bug));

    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
