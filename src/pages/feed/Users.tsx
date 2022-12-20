import Button from "components/Button";
import SortIcon from "@mui/icons-material/Sort";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import {
  IFirebaseUser,
  IUser,
} from "typescript/interfaces/UserSlice.interfaces";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ErrorIcon from "@mui/icons-material/Error";
import AddUser from "components/AddUser";
import EditUser from "components/EditUser";
import { onSnapshot } from "firebase/firestore";
import { createCollection } from "../../firebase/firebase";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [sortThis, setSortThis] = useState("");
  const [userDetail, setUserDetail] = useState<string>("");
  const [activeUser, setActiveUser] = useState<IUser>();
  const [usersLoading, setUsersLoading] = useState(false);

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
    setUsersLoading(true);
    const usersCollection = createCollection<IUser>("users");
    onSnapshot(usersCollection, (res) => {
      setUsersLoading(false);
      setUsers(
        res.docs.map((item) => {
          return { ...item.data(), uid: item.id };
        }))})
        console.log(users)
  }, []);

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserInput(e.target.value);
  };

  const filteredUsersData = users.filter((user) => {
    if (searchUserInput === "") {
      return user;
    } else if (
      user?.name.toLowerCase().includes(searchUserInput.toLowerCase())
    ) {
      return user;
    }
    return null;
  });

  const editUser = (user: IUser) => {
    setUserDetail("editUser");
    setActiveUser(user);
  };

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
        <Button
          className="add-user__button"
          text="Add user"
          icon={<AddCircleOutlineIcon />}
          onClick={() => setUserDetail("addUser")}
        />
      </div>

      <div className="users__users-information">
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
                          <img src={user?.photo} alt="user" />
                        ) : (
                          <h3>{user?.name?.charAt(0)}</h3>
                        )}
                      </div>
                      <p>{user?.name}</p>
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
                  <EditIcon onClick={() => editUser(user)} />
                </div>
              ))
          ) : usersLoading ? (
            <div className="users__user">
              <div className="users__user__message users--loading">
                <AutorenewIcon />
                <p>Loading ...</p>
              </div>
            </div>
          ) : (
            <div className="users__user">
              <div className="users__user__message users--notfound">
                <ErrorIcon />
                <p>User's data not found</p>
              </div>
            </div>
          )}
        </div>

        {userDetail === "addUser" && <AddUser setUserDetail={setUserDetail} />}
        {userDetail === "editUser" && (
          <EditUser setUserDetail={setUserDetail} activeUser={activeUser} />
        )}
      </div>
    </section>
  );
};

export default Users;
