import { RouterProvider } from "react-router-dom"
import router from "@components/router/Router"

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
