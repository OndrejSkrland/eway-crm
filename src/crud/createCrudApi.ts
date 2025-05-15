import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export type ListModel<T> = {
  page: number;
  pageSize: number;
  data: T[];
};

export type CrudApiBuilderReturn<Item, List, Create> = {
  get: (id: number, config?: AxiosRequestConfig) => Promise<Item>;
  list: (params: List, config?: AxiosRequestConfig) => Promise<ListModel<Item>>;
  create: (data: Create, config?: AxiosRequestConfig) => Promise<Item>;
  update: (
    id: number,
    data: Create & { id: number },
    config?: AxiosRequestConfig
  ) => Promise<Item>;
  delete: (id: number, config?: AxiosRequestConfig) => Promise<Item>;
};

export function createCrudApi<
  PluralName extends string,
  GetResponseModel,
  List,
  Create
>(
  pluralName: PluralName
): CrudApiBuilderReturn<GetResponseModel, List, Create> {
  const baseApiUrl = `/api/v1/${pluralName}/`;
  return {
    get: async (id: number, config?: AxiosRequestConfig) => {
      return (
        await axios.get<GetResponseModel>(baseApiUrl + id.toString(), {
          ...config,
        })
      ).data;
    },
    list: async (params: List, config?: AxiosRequestConfig) => {
      return (
        await axios.get<ListModel<GetResponseModel>>(baseApiUrl + "list", {
          params,
          ...config,
        })
      ).data;
    },
    create: async (data: Create, config?: AxiosRequestConfig) => {
      return (
        await axios.post<GetResponseModel>(baseApiUrl, data, {
          ...config,
        })
      ).data;
    },
    update: async (
      id: number,
      data: Create & { id: number },
      config?: AxiosRequestConfig
    ) => {
      return (
        await axios.put<GetResponseModel>(baseApiUrl + id.toString(), data, {
          ...config,
        })
      ).data;
    },
    delete: async (id: number, config?: AxiosRequestConfig) => {
      return (
        await axios.delete<GetResponseModel>(baseApiUrl + id.toString(), {
          ...config,
        })
      ).data;
    },
  };
}
