import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import AdForm from "../../features/AdForm/AdForm";

const AdAdd = () => {
  const user = useSelector((s) => s.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const onSubmit = async (fd) => {
    const r = await fetch(`${API_URL}/api/ads`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    if (r.status === 400) throw new Error("Validation error");
    if (r.status === 401) throw new Error("Not logged in");
    if (!r.ok) throw new Error("Server error");
    const created = await r.json();
    navigate(`/ad/${created._id}`);
  };

  return <AdForm mode="add" onSubmit={onSubmit} />;
};

export default AdAdd;
