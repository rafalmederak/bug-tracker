import LoginLayout from "layouts/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "assets/images/login-demo.png";
import Button from "components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const demoUserEmail = process.env.REACT_APP_DEMOUSEREMAIL!;
  const demoUserPassword = process.env.REACT_APP_DEMOUSERPASSWORD!;

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/feed/home");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const demoUserLogin = () => {
    signInWithEmailAndPassword(auth, demoUserEmail, demoUserPassword)
      .then(() => {
        navigate("/feed/home");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <LoginLayout
      title="Login"
      form={
        <form onSubmit={login} className="login-layout__form-box">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button text="Sign in" />
        </form>
      }
      helpers={
        <>
          <p>
            Don’t have an account?{" "}
            <Link to={"/register"}>
              <b>Register</b>
            </Link>
          </p>
          <p>
            Sign in as a <b onClick={demoUserLogin}>Demo User</b>
          </p>
        </>
      }
      image={LoginImage}
    />
  );
};

export default Login;
