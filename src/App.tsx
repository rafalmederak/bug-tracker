import "assets/sass/main.scss";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "store/userSlice";

import { IUserAuth } from "typescript/interfaces/Firebase.interfaces";
import MainRoutes from "routes/MainRoutes";
import FeedRoutes from "routes/FeedRoutes";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth: IUserAuth | null) => {
        if (userAuth) {
          userAuth.getIdTokenResult().then((idTokenResult) => {
            userAuth.admin = idTokenResult.claims.admin;
            dispatch(
              login({
                user: {
                  uid: userAuth.uid,
                  email: userAuth.email,
                  name: userAuth.displayName,
                  admin: userAuth.admin,
                  phone: userAuth.phoneNumber,
                  photo: userAuth.photoURL,
                },
              })
            );
          });
        } else {
          dispatch(logout());
        }
      }
    );

    return unsubscribe;
  }, [dispatch]);

  return !user ? <MainRoutes /> : <FeedRoutes />;
}

export default App;
