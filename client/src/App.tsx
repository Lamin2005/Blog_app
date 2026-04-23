import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";

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
          element:<CreatePost/>
        },
        {
          path: "/post-detail/:id",
          element: <PostDetail />,
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
