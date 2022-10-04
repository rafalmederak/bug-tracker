import LoginLayout from "layouts/LoginLayout";
import { Link } from "react-router-dom";
import RegisterImage from "assets/images/register-demo.png";

const Register = () => {
  return (
    <LoginLayout
      title="Register"
      username={true}
      buttonText="Register"
      helpers={
        <>
          <p>
            Already have an account?{" "}
            <b>
              <Link to={"/login"}>Sign in</Link>
            </b>
          </p>
        </>
      }
      image={RegisterImage}
    />
  );
};

export default Register;
