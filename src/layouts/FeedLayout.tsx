//react
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

//firebase
import { auth } from "../firebase/firebase";

//data
import { sidebarlinks } from "data/SidebarLinks";

//redux
import { useSelector } from "react-redux";
import { selectUser } from "store/userSlice";

//icons
import { ReactComponent as Logo } from "assets/images/logo-extended.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//interfaces
import { IFeedLayoutProps } from "typescript/interfaces/FeedLayout.interfaces";

const FeedLayout = ({ children }: IFeedLayoutProps) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  const examplerole: string = "Admin";

  return (
    <div className="feed-layout__container">
      <header className="feed-layout__header">
        <div
          className={`feed-layout__header-extended ${
            isMenuOpen && "header--active"
          }`}
        >
          <div className="feed-layout__header__user">
            <div
              className={`feed-layout__header__role ${
                examplerole === "Admin"
                  ? "header__role--blue"
                  : examplerole === "User" && "header__role--green"
              }`}
            >
              <p>{examplerole}</p>
            </div>
            <h2>{user?.name}</h2>
          </div>
          <div className="feed-layout__header__icons">
            <LogoutIcon onClick={logout} />
            <CloseIcon
              onClick={() => setIsMenuOpen(false)}
              className="feed-layout__header__close-icon"
            />
          </div>
        </div>

        <div
          className={`feed-layout__header-short ${
            !isMenuOpen && "header--active"
          }`}
        >
          <Logo />
          <div className="feed-layout__header__icons">
            <MoreVertIcon onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </header>

      <div className="feed-layout__sidebar__logo-wrapper">
        <Logo />
      </div>
      <div
        className={`feed-layout__sidebar ${isMenuOpen && "sidebar--active"}`}
      >
        <div className="feed-layout__sidebar__items">
          {sidebarlinks.map((item) => (
            <NavLink
              to={item.link}
              key={item.id}
              className={({ isActive }) =>
                isActive
                  ? "feed-layout__sidebar__item sidebar__item--active"
                  : "feed-layout__sidebar__item"
              }
            >
              <item.icon />
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="feed-layout__section">{children}</div>
    </div>
  );
};

export default FeedLayout;
