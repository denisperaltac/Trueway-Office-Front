import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { ConfigProvider } from "antd";
import { store } from "./store";
import { Provider } from "react-redux";
import { Router } from "./Router";
createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "red",
      },
    }}
  >
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>
);
