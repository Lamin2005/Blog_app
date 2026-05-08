import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../store";
import { useProfileQuery } from "../features/api/userapi";
import { useNavigate } from "react-router-dom";
import { logoutuser } from "../features/auth/AuthSlice";
import { toast } from "react-toastify";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError } = useProfileQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    if (isLoading || !userInfo) return;

    if (isError) {
      dispatch(logoutuser());
      toast.error("Session expired. Please login again");
      navigate("/login");
      console.log("loop");
    }
  }, [isLoading, isError, userInfo, dispatch, navigate]);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 bg-[#020617]/5 rounded-2xl">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
