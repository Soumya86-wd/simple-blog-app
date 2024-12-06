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
  {
    path: "all-posts",
    element: <AllPosts />,
    name: "All Posts",
    inNavbar: true,
  },
  {
    path: "add-post",
    element: <AddPost />,
    name: "Add Post",
    inNavbar: true,
  },
  {
    path: "edit-post/:slug",
    element: <EditPost />,
    name: "Edit Post",
    inNavbar: false,
  },
  {
    path: "post/:slug",
    element: <Post />,
    name: "View Post",
    inNavbar: false,
  },
];

const openRoutes = [
  {
    path: "login",
    element: <Login />,
    name: "Login",
    inNavbar: true,
  },
  {
    path: "signup",
    element: <Signup />,
    name: "Signup",
    inNavbar: true,
  },
];

const homeRoute = {
  index: true,
  element: <Home />,
  name: "Home",
  inNavbar: true,
};

export const routerStrategy = [
  {
    path: "/",
    element: <App />,
    children: [
      homeRoute,
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

export const generateNavItems = (authStatus) => {
  const availableRoutes = [
    homeRoute,
    ...(authStatus ? protectedRoutes : openRoutes),
  ];

  return availableRoutes
    .filter((route) => route.inNavbar)
    .map((route) => ({
      name: route.name,
      endpoint: route.index ? "/" : `/${route.path}`,
    }));
};
