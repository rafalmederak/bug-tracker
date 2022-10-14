import { Link } from "react-router-dom";
import { ReactComponent as NotFoundImage } from "assets/images/not-found.svg";
import Button from "components/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { INotFoundProps } from "typescript/interfaces/NotFound.interfaces";

const NotFound = ({ text, link }: INotFoundProps) => {
  return (
    <div className="not-found__container">
      <NotFoundImage />
      <h2>{text}</h2>
      <Link to={link} className="not-found__link">
        <Button text="Go to the home page" icon={<ArrowForwardIosIcon />} />
      </Link>
    </div>
  );
};

export default NotFound;
