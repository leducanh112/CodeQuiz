import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Answers from "../pages/Answers";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import PrivateRoutes from "../components/PrivateRoutes";
import Logout from "../pages/Logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault></LayoutDefault>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/logout",
        element: <Logout></Logout>,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "answers",
            element: <Answers></Answers>,
          },
          {
            path: "quiz/:id",
            element: <Quiz></Quiz>,
          },
          {
            path: "result/:id",
            element: <Result></Result>,
          },
          {
            path: "Topic",
            element: <Topic></Topic>,
          },
        ],
      },
    ],
  },
];
