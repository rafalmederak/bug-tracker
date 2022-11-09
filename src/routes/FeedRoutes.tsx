import FeedLayout from "layouts/FeedLayout";
import Users from "pages/feed/Users";
import NotFound from "pages/NotFound";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { selectUser } from "store/userSlice";

const FeedRoutes = () => {
  const user = useSelector(selectUser);
  return (
    <Routes>
      <Route element={<FeedLayout />}>
        <Route
          path="/feed/home"
          element={
            <div>
              <h1>Home</h1>
            </div>
          }
        />
        {user?.admin && <Route path="/feed/users" element={<Users />} />}
      </Route>
      <Route
        path={"/login"}
        element={
          <NotFound
            text="You have to log out to log in to another account."
            link="/feed/home"
          />
        }
      />
      <Route
        path="*"
        element={<NotFound text="Page not found." link="/feed/home" />}
      />
    </Routes>
  );
};

export default FeedRoutes;
