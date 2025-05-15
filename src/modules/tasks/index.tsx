import { createCrud } from "../../crud/createCrud";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { ListPage } from "./pages/ListPage";
import { UpdatePage } from "./pages/UpdatePage";
import type { CreateTaskModel } from "./types/create";
import type { FilterTaskModel } from "./types/filter";
import type { GetTaskModel } from "./types/get";

export const {
  taskRoutes,
  taskApi,
  taskThunks,
  taskSlice,
  useTaskNavigate,
  taskNavigator,
} = createCrud<string, string, GetTaskModel, FilterTaskModel, CreateTaskModel>(
  "task",
  "tasks",
  {
    ListPage,
    CreatePage,
    UpdatePage,
    DetailPage,
  }
);

export default taskSlice.reducer;
