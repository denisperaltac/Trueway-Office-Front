import "antd/dist/reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { store } from "./store";
import { Provider } from "react-redux";
import { Router } from "./Router";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2123bf",
        },
      }}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
