import MockAdapter from "axios-mock-adapter";
import Axios from "axios";
import { addBug, getUnresolvedBugs, resolvedBug } from "../bugs";
import configureStore from "./../configureStore";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(Axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, _id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark the bug as resolved if it's saved to the server.", async () => {
    fakeAxios.onPost("/bugs").reply(200, { _id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(200, { _id: 1, resolved: true });

    await store.dispatch(addBug({ _id: 1 }));
    await store.dispatch(resolvedBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server.", async () => {
    fakeAxios.onPost("/bugs").reply(200, { _id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(500);

    await store.dispatch(addBug({ _id: 1 }));
    await store.dispatch(resolvedBug(1));

    expect(bugsSlice().list[0].resolved).toBeFalsy();
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
