import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
onLoginSuccess = () => {
  navigate("/dashboard");
};
