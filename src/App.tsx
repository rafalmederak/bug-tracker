import "assets/sass/main.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { login, logout, selectUser } from "store/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            user: {
              uid: userAuth.uid,
              email: userAuth.email,
              name: userAuth.displayName,
            },
          })
        );
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
        </>
      ) : (
        <Route path="/feed/home" element={<></>} />
      )}
    </Routes>
  );
}

export default App;
