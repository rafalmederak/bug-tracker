import Button from "components/Button";
import SortIcon from "@mui/icons-material/Sort";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IUser } from "typescript/interfaces/UserSlice.interfaces";
import { createCollection } from "../../firebase/firebase";

const Users = () => {
  const usersCollection = createCollection<IUser>("users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getDocs(usersCollection).then((res) => {
      setUsers(
        res.docs.map((item) => {
          return { ...item.data(), uid: item.id };
        })
      );
    });
  }, [usersCollection]);

  return (
    <section className="users__container">
      <h1>Users</h1>

      <div className="users__filter">
        <input type="text" placeholder="Search..." />
        <div className="users__filter__role-container">
          <SortIcon />
          <p>Name</p>
        </div>
        <h4 className="users__count">
          All users: <b>{users.length}</b>
        </h4>
        <Button text="Add user" icon={<AddCircleOutlineIcon />} />
      </div>

      <div className="users__table">
        {users.map((user: IUser) => (
          <div className="users__user" key={user.uid}>
            <div className="users__user__main">
              <div className="users__user__name-container">
                <div className="users__user__photo-container">
                  {user?.photo ? (
                    <img src={user.photo} alt="user" />
                  ) : (
                    <h3>{user?.name?.charAt(0)}</h3>
                  )}
                </div>
                <p>{user.name}</p>
              </div>
            </div>
            <div
              className={`users__user__role ${
                user?.admin
                  ? "users__user__role--blue"
                  : "users__user__role--green"
              }`}
            >
              <p>{user?.admin ? "Admin" : "User"}</p>
            </div>
            <EditIcon />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Users;
