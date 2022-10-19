import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const sidebarlinks = [
  {
    id: 1,
    name: "Home",
    link: "/feed/home",
    icon: HomeIcon,
  },
  {
    id: 2,
    name: "Projects",
    link: "/feed/projects",
    icon: AccountTreeIcon,
  },
  {
    id: 3,
    name: "Tickets",
    link: "/feed/tickets",
    icon: CollectionsBookmarkIcon,
  },
  {
    id: 4,
    name: "Users",
    link: "/feed/users",
    icon: PeopleAltIcon,
  },
  {
    id: 5,
    name: "Account",
    link: "/feed/account",
    icon: AccountBoxIcon,
  },
];
