import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  Post,
  Signup,
} from "../pages";

import App from "../App";
import { AuthLayout } from "../components";

const protectedRoutes = [
  { path: "all-posts", element: <AllPosts /> },
  { path: "add-post", element: <AddPost /> },
  { path: "edit-post/:slug", element: <EditPost /> },
  { path: "post/:slug", element: <Post /> },
];

const openRoutes = [
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
];

export const routerStrategy = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      ...openRoutes.map((route) => ({
        ...route,
        element: (
          <AuthLayout authentication={false}>{route.element}</AuthLayout>
        ),
      })),
      ...protectedRoutes.map((route) => ({
        ...route,
        element: <AuthLayout authentication={true}>{route.element}</AuthLayout>,
      })),
    ],
  },
];
