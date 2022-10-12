import { ReactComponent as Logo } from "assets/images/logo-extended.svg";
import { ILoginLayoutProps } from "typescript/interfaces/LoginLayout.interfaces";

const LoginLayout = ({ title, form, helpers, image }: ILoginLayoutProps) => {
  return (
    <div className="login-layout__container">
      <Logo className="login-layout__logo" />
      <div className="login-layout__form-container">
        <div className="login-layout__form-wrapper">
          <h1>{title}</h1>
          <h2>Please enter your account details.</h2>
          {form}
          <div className="login-layout__helpers">{helpers}</div>
        </div>
      </div>
      <div className="login-layout__image-container">
        <img src={image} alt="demo-page" />
      </div>
    </div>
  );
};

export default LoginLayout;
