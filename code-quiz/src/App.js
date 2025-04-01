import "./App.css";
import AllRoutes from "./components/AllRoutes";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
