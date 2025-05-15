import type { ComponentType } from "react";
import type { NavigateFunction, RouteObject } from "react-router";
import { useNavigate as useRouterNavigate } from "react-router";

export type PagesTypes = "List" | "Create" | "Update" | "Detail";
export type PagesTypesMap = {
  [K in `${PagesTypes}Page`]: ComponentType | undefined;
};

type CrudNavigatorBuilderArg = {
  name: string;
} & PagesTypesMap;

const pagesTypes: PagesTypes[] = ["List", "Create", "Update", "Detail"];

export function createCrudRoutes({
  name,
  ListPage,
  CreatePage,
  UpdatePage,
  DetailPage,
}: CrudNavigatorBuilderArg): RouteObject[] {
  const rootPath = `/${name}/`;
  return pagesTypes.map((page) => {
    const Component = (
      {
        ListPage,
        CreatePage,
        UpdatePage,
        DetailPage,
      } as CrudNavigatorBuilderArg
    )[`${page}Page`];
    return { path: rootPath + page.toLocaleLowerCase(), Component };
  });
}

export type CrudNavigatorBuilderReturn = {
  useNavigate: () => CrudNavigate;
  navigator: CrudNavigator;
};

type CrudNavigate = {
  toList: () => void;
  toCreate: () => void;
};

export type CrudNavigator = {
  toList: (nav: NavigateFunction) => void;
  toCreate: (nav: NavigateFunction) => void;
};

export function createCrudNavigator(name: string): CrudNavigatorBuilderReturn {
  function useNavigate() {
    const navigate = useRouterNavigate();

    return {
      toList: () => navigate(`/${name}/list`),
      toCreate: () => navigate(`/${name}/create`),
    };
  }

  const navigator: CrudNavigator = {
    toList: (nav) => void nav(`/${name}/list`),
    toCreate: (nav) => void nav(`/${name}/create`),
  };

  return { useNavigate, navigator };
}
