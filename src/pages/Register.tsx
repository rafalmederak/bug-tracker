import LoginLayout from "layouts/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "assets/images/register-demo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import Button from "components/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: username,
        });
        navigate("/feed/home");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <LoginLayout
      title="Register"
      form={
        <form onSubmit={register} className="login-layout__form-box">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
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
          <Button text="Register" />
        </form>
      }
      helpers={
        <>
          <p>
            Already have an account?{" "}
            <Link to={"/login"}>
              <b>Sign in</b>
            </Link>
          </p>
        </>
      }
      image={RegisterImage}
    />
  );
};

export default Register;
