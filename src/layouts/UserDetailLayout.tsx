import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "components/Button";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IUserDetailLayoutProps } from "typescript/interfaces/UserDetail.interfaces";

import { FormData } from "typescript/types/UsersForm.types";

const UserDetailLayout = ({
  setUserDetail,
  activeUser,
  formValues,
  onSubmit,
  removeUser,
}: IUserDetailLayoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: formValues,
  });

  useEffect(() => {
    reset(formValues);
  }, [activeUser]);

  return (
    <div className="user-detail__container">
      <CancelIcon
        className="user-detail__close-icon"
        onClick={() => setUserDetail("")}
      />
      {activeUser?.photo ? (
        <img
          src={activeUser.photo}
          alt="user"
          className="user-detail__user-image"
        />
      ) : (
        <AccountCircleIcon className="user-detail__user-icon" />
      )}

      <form className="user-detail__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="user-detail__form__item">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: 50,
            })}
          />
          {errors.name?.message && (
            <p className="user-detail__error-message">{errors.name?.message}</p>
          )}
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="photo">Photo (url)</label>
          <input {...register("photo", {})} />
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="phone">Phone</label>
          <input
            type="string"
            {...register("phone", {
              maxLength: 50,
              // pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
            })}
          />
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="role">Role</label>
          <select
            {...register("role", {
              maxLength: 50,
            })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              maxLength: 50,
            })}
          />
          {errors.email?.message && (
            <p className="user-detail__error-message">
              {errors.email?.message}
            </p>
          )}
        </div>

        {!activeUser && (
          <div className="user-detail__form__item">
            <div className="user-detail__form__item__password-check">
              <label htmlFor="password">Login password</label>
            </div>
            {/* <input
            type="button"
            disabled={changePassword ? false : true}
            value="Send email to user"
            onClick={() => console.log("LETS GO")}
          /> */}
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                maxLength: 50,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password requirement: Minimum eight characters, at least one letter and one number.",
                },
              })}
            />
            {errors.password?.message && (
              <p className="user-detail__error-message">
                {errors.password?.message}
              </p>
            )}
          </div>
        )}

        <div className="user-detail__form-buttons">
          <Button text="Submit" type="submit" />
          {activeUser && (
            <Button
              text="Remove user"
              type="button"
              onClick={removeUser}
              background="red"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UserDetailLayout;
