import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../state/store";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};
const ProtectedAdminRoutes = ({ children }: ProtectedRoutesProps) => {
  const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);

  return isAdmin ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedAdminRoutes;
