import { checkExist, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExistEmail = await checkExist("email", email);
    console.log(checkExistEmail);
    if (checkExistEmail.length > 0) {
      alert("Email đã tồn tại");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };
      const response = await register(options);
      if (response) {
        alert("Đăng kí thành công");
        navigate("/login");
      } else {
        alert("Đăng kí thất bại");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input required type="fullName" placeholder="Name"></input>
        </div>
        <div>
          <input required type="email" placeholder="Email"></input>
        </div>
        <div>
          <input required type="password" placeholder="Password"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
