import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalItem } from "../values/Utilitas";

const App = () => {
  const saved = getLocalItem("auth");
  let navigate = useNavigate();
  useEffect(() => {
    if (saved === "admin") {
      navigate("/admin", { reflace: true });
    } else if (saved === "user") {
      navigate("/user", { reflace: true });
    } else {
      navigate("/login", { reflace: true });
    }
  });
};

export default App;
