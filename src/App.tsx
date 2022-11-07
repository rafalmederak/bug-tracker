import "assets/sass/main.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { login, logout, selectUser } from "store/userSlice";
import NotFound from "pages/NotFound";
import FeedLayout from "layouts/FeedLayout";
import { IUserAuth } from "typescript/interfaces/Firebase.interfaces";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth: IUserAuth | null) => {
      if (userAuth) {
        userAuth.getIdTokenResult().then(idTokenResult => {
        userAuth.admin = idTokenResult.claims.admin        
        dispatch(
          login({
            user: {
              uid: userAuth.uid,
              email: userAuth.email,
              name: userAuth.displayName,
              admin: userAuth.admin,
              phone: userAuth.phoneNumber,
              photo: userAuth.photoURL
            },
          })
        );
      })
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path={"/feed/*"}
            element={
              <NotFound
                text="You have to log in to access this page."
                link="/"
              />
            }
          />
          <Route
            path="*"
            element={<NotFound text="Page not found." link="/" />}
          />
        </>
      ) : (
        <>
          <Route
            path="/feed/home"
            element={
              <FeedLayout>
                <div>
                  <h1>Home</h1>
                </div>
              </FeedLayout>
            }
          />
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
        </>
      )}
    </Routes>
  );
}

export default App;
