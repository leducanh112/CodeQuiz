import { useNavigate } from "react-router-dom";
import { deletaAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  deletaAllCookies();

  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, []);
  return <></>;
}

export default Logout;
