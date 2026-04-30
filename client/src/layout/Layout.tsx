import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
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
