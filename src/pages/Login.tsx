import LoginLayout from "layouts/LoginLayout";
import { Link } from "react-router-dom";
import LoginImage from "assets/images/login-demo.png";

const Login = () => {
  return (
    <LoginLayout
      title="Login"
      username={false}
      buttonText="Sign in"
      helpers={
        <>
          <p>
            Don’t have an account?{" "}
            <b>
              <Link to={"/register"}>Register</Link>
            </b>
          </p>
          <p>
            Sign in as a <b>Demo User</b>
          </p>
        </>
      }
      image={LoginImage}
    />
  );
};

export default Login;
