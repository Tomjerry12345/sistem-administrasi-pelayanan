import { useLocation, useNavigate } from "react-router-dom";

const DrawerLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelectedPage = (value) => location.pathname === value;

  const onClick = (value) => {
    navigate(value);
  };

  return {
    onClick,
    isSelectedPage,
  };
};

export default DrawerLogic;
