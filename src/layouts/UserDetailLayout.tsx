import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IUserDetail } from "typescript/interfaces/UserDetail.interfaces";

const UserDetailLayout = ({ setUserDetail, form }: IUserDetail) => {
  return (
    <div className="user-detail__container">
      <CancelIcon
        className="user-detail__close-icon"
        onClick={() => setUserDetail("")}
      />
      <AccountCircleIcon className="user-detail__user-icon" />
      {form}
    </div>
  );
};

export default UserDetailLayout;
