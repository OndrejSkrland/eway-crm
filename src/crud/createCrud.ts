import type {
  CrudNavigator,
  CrudNavigatorBuilderReturn,
  PagesTypesMap,
} from "./createCrudRoutes";
import { createCrudNavigator, createCrudRoutes } from "./createCrudRoutes";
import type { RouteObject } from "react-router";
import type { CrudApiBuilderReturn } from "./createCrudApi";
import { createCrudApi } from "./createCrudApi";
import type { ThunksModel } from "./createCrudReducer";
import { createCrudReducer } from "./createCrudReducer";
import { capitalizeFirstLetter } from "../utils/format";

type CrudBuilderReturn<Name extends string, Item, List, Create, Slice> = {
  [K in `${Name}Routes`]: RouteObject[];
} & {
  [K in `${Name}Api`]: CrudApiBuilderReturn<Item, List, Create>;
} & {
  [K in `${Name}Thunks`]: ThunksModel<Item, List>;
} & {
  [K in `${Name}Slice`]: Slice;
} & {
  [K in `use${Capitalize<Name>}Navigate`]: CrudNavigatorBuilderReturn["useNavigate"];
} & {
  [K in `${Name}Navigator`]: CrudNavigator;
};

export function createCrud<
  Name extends string,
  PluralName extends string,
  Item,
  List,
  Create
>(name: Name, pluralName: PluralName, pages: PagesTypesMap) {
  const routes = createCrudRoutes({ name, ...pages });
  const { useNavigate, navigator } = createCrudNavigator(name);
  const api = createCrudApi<PluralName, Item, List, Create>(pluralName);
  const { slice, thunks } = createCrudReducer<
    Name,
    PluralName,
    Item,
    List,
    Create
  >(name, pluralName, api);

  return {
    [`${name}Routes`]: routes,
    [`${name}Api`]: api,
    [`${name}Thunks`]: thunks,
    [`${name}Slice`]: slice,
    [`use${capitalizeFirstLetter(name)}Navigate`]: useNavigate,
    [`${name}Navigator`]: navigator,
  } as CrudBuilderReturn<Name, Item, List, Create, typeof slice>;
}
