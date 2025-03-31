import "./LayoutDefault.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../logo.png";
function LayoutDefault() {
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <a href="/home">
              <img src={logo}></img>
            </a>
          </div>
          <div className="layout-default__menu">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              {isLogin && (
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
            {isLogin ? (
              <>
                <NavLink to="logout">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="login">Login/Register</NavLink>
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
