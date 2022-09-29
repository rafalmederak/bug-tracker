import { IButton } from "typescript/interfaces/Button.interfaces";

const Button = ({
  icon,
  text,
  background = "blue-700",
  color = "white",
}: IButton) => {
  return (
    <button
      className={`button__container btn--background-${background} btn--color-${color}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
