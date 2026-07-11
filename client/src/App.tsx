import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./app/store"
import { ToastList } from "./components/ui/ToastList";

export default function App() {
  return <Provider store={store}>
    <ToastList/>
    <RouterProvider router={router} />
  </Provider>;
}