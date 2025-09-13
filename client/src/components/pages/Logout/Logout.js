import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    }).finally(() => {
      dispatch(logOut());
      navigate("/");
    });
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
