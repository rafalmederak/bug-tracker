import FeedLayout from "layouts/FeedLayout";
import NotFound from "pages/NotFound";
import { Route, Routes } from "react-router-dom";

const FeedRoutes = () => {
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
