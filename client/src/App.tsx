import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Profile from "./pages/Profile";
import ProtectRoute from "./routes/ProtectRoute";
import EditProfile from "./pages/EditProfile";
import OwnerProfile from "./pages/OwnerProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/create",
          element: (
            <ProtectRoute>
              <CreatePost />
            </ProtectRoute>
          ),
        },
        {
          path: "/post-detail/:id",
          element: <PostDetail />,
        },
        {
          path: "/edit/:id",
          element: <EditPost />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <RegisterForm />,
        },
        {
          path: "/profile",
          element: (
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          ),
        },

        {
          path: "/users/:id",
          element: <OwnerProfile />,
        },

        {
          path: "/edit-profile",
          element: (
            <ProtectRoute>
              <EditProfile />
            </ProtectRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
