import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/stote";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import { defaultTheme } from "./styles/themes/default";
import { RouterProvider } from "./app/BrowserRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeIcons } from "@fluentui/react/lib/Icons";

const queryClient = new QueryClient();
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
