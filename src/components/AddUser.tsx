import { usersInputs } from "data/UserInputs";
import Button from "./Button";
import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetail } from "typescript/interfaces/UserDetail.interfaces";

const AddUser = ({ setUserDetail }: IUserDetail) => {
  return (
    <UserDetailLayout
      form={
        <form className="user-detail__form">
          {usersInputs.map((user) => (
            <div className="user-detail__form__item">
              <label htmlFor={user.id}>{user.label}</label>
              {user.element === "input" ? (
                <input type={user.type} id={user.id} />
              ) : (
                user.element === "select" && (
                  <select className="user-detail__form__select">
                    {user.option?.map((option) => (
                      <option id={option.id}>{option.name}</option>
                    ))}
                  </select>
                )
              )}
            </div>
          ))}
          <div className="user-detail__form-buttons">
            <Button text="Submit" type="submit" />
          </div>
        </form>
      }
      setUserDetail={setUserDetail}
    />
  );
};

export default AddUser;
