import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const isLoggedIn = sessionStorage.getItem('status')
    return (
      isLoggedIn === "loggedin" ? <Outlet /> : <Navigate to="/login" />
    )
};

export default PrivateRoutes;
