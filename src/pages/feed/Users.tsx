import Button from "components/Button";
import SortIcon from "@mui/icons-material/Sort";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IUser } from "typescript/interfaces/UserSlice.interfaces";
import { createCollection } from "../../firebase/firebase";
import ErrorIcon from "@mui/icons-material/Error";

const Users = () => {
  const usersCollection = createCollection<IUser>("users");
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [sortThis, setSortThis] = useState("");

  const sortUsers = (a: IUser, b: IUser) => {
    switch (sortThis) {
      case "name-asc":
        return a.name! > b.name! ? 1 : -1;
      case "name-desc":
        return a.name! > b.name! ? -1 : 1;
      case "role-byAdmin":
        return a.admin === b.admin ? 0 : a.admin ? -1 : 1;
      case "role-byUser":
        return a.admin === b.admin ? 0 : a.admin ? 1 : -1;
      default:
        return a.name! > b.name! ? 1 : -1;
    }
  };

  useEffect(() => {
    onSnapshot(usersCollection, (res) => {
      setUsers(
        res.docs.map((item) => {
          return { ...item.data(), uid: item.id };
        })
      );
    });
  }, []);

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserInput(e.target.value);
  };

  const filteredUsersData = users.filter((user) => {
    if (searchUserInput === "") {
      return user;
    } else if (
      user.name?.toLowerCase().includes(searchUserInput.toLowerCase())
    ) {
      return user;
    }
    return null;
  });

  return (
    <section className="users__container">
      <h1>Users</h1>

      <div className="users__filter">
        <input type="text" placeholder="Search..." onChange={searchUser} />
        <div className="users__filter__role-container">
          <SortIcon />
          <select
            name="sort-users"
            id="sort-users"
            className="users__filter__select"
            onChange={(e) => setSortThis(e.target.value)}
          >
            <option value="name-asc">Name (asc)</option>
            <option value="name-desc">Name (desc)</option>
            <option value="role-byAdmin">Role (admin)</option>
            <option value="role-byUser">Role (user)</option>
          </select>
        </div>
        <h4 className="users__count">
          All users: <b>{users.length}</b>
        </h4>
        <Button text="Add user" icon={<AddCircleOutlineIcon />} />
      </div>

      <div className="users__table">
        {filteredUsersData.length > 0 ? (
          filteredUsersData
            .sort((a: IUser, b: IUser) => sortUsers(a, b))
            .map((user: IUser) => (
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
            ))
        ) : (
          <div className="users__user">
            <div className="users__user__not-found-message">
              <ErrorIcon />
              <p>User not found</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Users;
