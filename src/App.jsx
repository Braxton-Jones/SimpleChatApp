import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./App_Layout";
import LandingPage from "./ui/pages/LandingPage";
import Chats from "./ui/pages/Chats";
import PageLoader from "./ui/components/PageLoader";
import { RouteGuard } from "./util/RouteGuard";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="chats" element={<RouteGuard component={Chats} />} />
        <Route path="callback" element={<PageLoader />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
