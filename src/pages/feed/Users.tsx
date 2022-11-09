import Button from "components/Button";
import SortIcon from "@mui/icons-material/Sort";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

const Users = () => {
  return (
    <section className="users__container">
      <h1>Users</h1>

      <div className="users__filter">
        <input type="text" placeholder="Search..." />
        <div className="users__filter__role-container">
          <SortIcon />
          <p>Name</p>
        </div>
        <Button text="Add user" icon={<AddCircleOutlineIcon />} />
      </div>

      <div className="users__table">
        <div className="users__user">
          <div className="users__user__main">
            <div className="users__user__name-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8vKOGOee675TqamFQ8n85QXQnc93fNVKgtCcITjXSZLLhufbzTkeHahaJUWu-GlupcE4&usqp=CAU"
                alt="user"
              />
              <p>Example User</p>
            </div>
            <div className="users__user__role users__user__role--green">
              <p>User</p>
            </div>
          </div>
          <EditIcon />
        </div>
      </div>
    </section>
  );
};

export default Users;
