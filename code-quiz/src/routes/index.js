import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Answers from "../pages/Answers";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import PrivateRoutes from "../components/PrivateRoutes";
import Logout from "../pages/Logout";
import CreateTopic from "../pages/CreateTopic";
import EditTopic from "../pages/EditTopic";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault></LayoutDefault>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
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
            path: "topic",
            element: <Topic></Topic>,
          },
          {
            path: "edit-topic/:id",
            element: <EditTopic></EditTopic>,
          },
          {
            path: "create-topic/:id",
            element: <CreateTopic />,
          },
        ],
      },
      {
        path: "*",
        element: <Home></Home>,
      },
    ],
  },
];
