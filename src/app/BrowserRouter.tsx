import { createBrowserRouter } from "react-router";
import { RouterProvider as Provider } from "react-router";
import { Outlet } from "./Outlet";
import App from "./App";
import { taskRoutes } from "../modules/tasks";
import { usersRoutes } from "../modules/users";

const defaultRoute = { path: "", Component: App };

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    children: [defaultRoute, ...taskRoutes, ...usersRoutes],
  },
]);

export function RouterProvider() {
  return <Provider router={router} />;
}
