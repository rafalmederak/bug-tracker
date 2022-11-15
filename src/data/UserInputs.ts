export const usersInputs = [
  {
    id: "name",
    label: "Name",
    element: "input",
    type: "text",
  },
  {
    id: "photo",
    label: "Photo (url)",
    element: "input",
    type: "text",
  },
  {
    id: "phone",
    label: "Phone",
    element: "input",
    type: "text",
  },
  {
    id: "role",
    label: "Role",
    element: "select",
    option: [
      { id: "admin", name: "Admin" },
      { id: "user", name: "User" },
    ],
  },
  {
    id: "email",
    label: "Email",
    element: "input",
    type: "text",
  },
  {
    id: "login-password",
    label: "Login password",
    element: "input",
    type: "password",
  },
];
