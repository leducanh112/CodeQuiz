import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);
  console.log(token);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">Logo</div>
          <div className="layout-default__menu">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">Answers</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (
              <>
                <NavLink to="logout">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="login">Login</NavLink>
                <NavLink to="register">Register</NavLink>
              </>
            )}
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet></Outlet>
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2025 by DUCA
        </footer>
      </div>
    </>
  );
}

export default LayoutDefault;
