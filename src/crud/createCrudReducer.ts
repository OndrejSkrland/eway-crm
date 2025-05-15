import type { AsyncThunk } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CrudApiBuilderReturn, ListModel } from "./createCrudApi";

type CrudReducerBuilderReturn<Item, List, Create, Slice> = {
  thunks: ThunksModel<Item, List>;
  slice: Slice;
};

export interface ThunksModel<Item, List> {
  list: AsyncThunk<ListModel<Item>, List, object>;
}

export function createCrudReducer<
  Name extends string,
  PluralName extends string,
  Item,
  List,
  Create
>(
  name: Name,
  pluralName: PluralName,
  api: CrudApiBuilderReturn<Item, List, Create>
) {
  type State = {
    name: Name;
    list: ListModel<Item>;
    get: Record<number, Item>;
  };

  const initialState: State = {
    name,
    list: {
      page: 0,
      pageSize: 0,
      data: [],
    },
    get: {},
  };

  const thunks = {
    list: createAsyncThunk(pluralName + "/list", async (arg: List) => {
      return await api.list(arg);
    }),
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearList(state) {
        state.list = {
          page: 0,
          pageSize: 0,
          data: [],
        };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(thunks.list.fulfilled, (state, action) => {
        console.log("list", action.payload);
      });
    },
  });

  return {
    thunks,
    slice,
  } as CrudReducerBuilderReturn<Item, List, Create, typeof slice>;
}
