import { useNavigate } from "react-router-dom";
import { setLocalItem } from "../../../values/Utilitas";

const AppBarLogic = () => {
  const navigate = useNavigate();

  const onClickNav = (value) => {
    if (value === "logout") {
      setLocalItem("auth", "false");
      navigate("/");
    } else if (value === "kusioner") {
      navigate("kusioner");
    }
  };
  return {
    onClickNav,
  };
};

export default AppBarLogic;
