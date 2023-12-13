import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const LogRoutes = () => {
  const isSessionStorageEmpty = () => {
    return Object.keys(sessionStorage).length === 0;
  };

  return (
    <Routes>
      {isSessionStorageEmpty() ? (
        <Route path="/" element={<Navigate to="/login" />} />
      ) : (
        <Route path="/" element={<Navigate to="/" />} />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default LogRoutes;
