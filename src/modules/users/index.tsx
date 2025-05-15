import type { NavigateFunction } from "react-router";
import { FindUserPage } from "./pages/FindUserPage";
import axios from "axios";
import type { FindUserFormValues } from "./components/FindUserForm";

export const usersRoutes = [
  {
    path: "/users/find",
    Component: FindUserPage,
  },
  {
    path: "/users/history",
    Component: undefined,
  },
];

export const usersNavigator = {
  toFind: (nav: NavigateFunction) => void nav("/users/find"),
  toHistory: (nav: NavigateFunction) => void nav("/users/history"),
};

export const usersApi = {
  getUser: async ({ email }: FindUserFormValues) => {
    const response = await axios.get<undefined>(`/API.svc/GetUsers`, {
      params: { email },
    });
    return response.data;
  },
};
