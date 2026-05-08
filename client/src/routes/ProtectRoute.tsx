import { useEffect } from "react";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PropRouter {
  children: React.ReactNode;
}

function ProtectRoute({ children }: PropRouter) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return <>{children}</>;
}

export default ProtectRoute;