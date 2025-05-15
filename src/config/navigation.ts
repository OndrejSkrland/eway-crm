import { NavigationProps } from "../modules/navigation/Navigation";
import { taskNavigator } from "../modules/tasks";
import { usersNavigator } from "../modules/users";

export type NavigationConfig = NavigationProps;

export const navigationConfig: NavigationConfig = {
  logoSrc: "/favicon.ico",
  items: [
    {
      id: "users/find",
      name: "Find User",
      navigate: (nav) => usersNavigator.toFind(nav),
    },
    {
      id: "tasks/create",
      name: "Create Task",
      navigate: (nav) => taskNavigator.toCreate(nav),
    },
    {
      id: "tasks/list",
      name: "Tasks",
      navigate: (nav) => taskNavigator.toList(nav),
    },
  ],
};
