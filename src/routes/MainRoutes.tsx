import Login from "pages/Login";
import Register from "pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path={"/feed/*"}
        element={
          <NotFound text="You have to log in to access this page." link="/" />
        }
      />
      <Route path="*" element={<NotFound text="Page not found." link="/" />} />
    </Routes>
  );
};

export default MainRoutes;
