import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "components/Button";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IUserDetailLayoutProps } from "typescript/interfaces/UserDetail.interfaces";

import { FormData } from "typescript/types/UsersForm.types";

import { yupResolver } from "@hookform/resolvers/yup";
import { usersSchema } from "schema/users.schema";

const UserDetailLayout = ({
  setUserDetail,
  activeUser,
  formValues,
  onSubmit,
  removeUser,
  formError,
}: IUserDetailLayoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: formValues,
    resolver: yupResolver(usersSchema),
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
          <input {...register("name")} required />
          {errors.name?.message && (
            <p className="user-detail__error-message">{errors.name?.message}</p>
          )}
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="photo">Photo (url)</label>
          <input {...register("photo")} />
          {errors.photo?.message && (
            <p className="user-detail__error-message">
              {errors.photo?.message}
            </p>
          )}
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="phone">Phone</label>
          <input type="string" {...register("phone")} />
          {errors.phone?.message && (
            <p className="user-detail__error-message">
              {errors.phone?.message}
            </p>
          )}
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="role">Role</label>
          <select {...register("role")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role?.message && (
            <p className="user-detail__error-message">{errors.role?.message}</p>
          )}
        </div>

        <div className="user-detail__form__item">
          <label htmlFor="email">Email</label>
          <input {...register("email")} required />
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
            <input type="password" {...register("password")} />
            {errors.password?.message && (
              <p className="user-detail__error-message">
                {errors.password?.message}
              </p>
            )}
          </div>
        )}

        <div className="user-detail__form-buttons__wrapper">
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
          {formError && <p>{formError}</p>}
        </div>
      </form>
    </div>
  );
};

export default UserDetailLayout;
