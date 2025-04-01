import { login } from "../../services/usersService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { checkExist, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { useState } from "react";
import Swal from "sweetalert2";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login
  const [active, setActive] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);

    if (response.length > 0) {
      console.log(response);
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      Swal.fire({
        title: "Incorrect email or password",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };
  // End Login

  //Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExistEmail = await checkExist("email", email);
    console.log(checkExistEmail);
    if (checkExistEmail.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Email already exists!",
        text: "Please use a different email.",
      });
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };
      const response = await register(options);
      if (response) {
        Swal.fire({
          title: "Registration successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setActive(false);
        });
      } else {
        Swal.fire({
          title: "Registration failed!",
          text: "Email already exists or an error occurred.",
          icon: "error",
          confirmButtonText: "Try again",
        });
      }
    }
  };
  //End Register
  return (
    <>
      <div data-aos="fade-up" className="login">
        <div className={`container ${active ? " active" : ""}`}>
          <div className="form-box login">
            <form action="#" onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input required type="email" placeholder="Email"></input>
                <i className="bx bxs-envelope"></i>
              </div>
              <div className="input-box">
                <input required type="password" placeholder="Password" />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className="forgot-link">
                <a href="/">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a href="/">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form action="#" onSubmit={handleRegister}>
              <h1>Registration</h1>
              <div className="input-box">
                <input type="fullName" placeholder="Full Name" required />
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input type="email" placeholder="Email" required />
                <i className="bx bxs-envelope"></i>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              <p>or register with social platforms</p>
              <div className="social-icons">
                <a href="/">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="btn register-btn"
                onClick={() => setActive(true)}
              >
                Register
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setActive(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
