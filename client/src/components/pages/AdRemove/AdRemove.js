import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config";

const AdRemove = () => {
  const { id } = useParams();
  const user = useSelector((s) => s.users);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const r = await fetch(`${API_URL}/api/ads/${id}`, {
        credentials: "include",
      });
      if (!r.ok) return navigate("/");
      const ad = await r.json();
      const isAuthor =
        user &&
        ad.seller &&
        (ad.seller._id === user.id || ad.seller === user.id);
      if (!isAuthor) return navigate("/");

      const ok = window.confirm("Delete this ad?");
      if (!ok) return navigate(`/ad/${id}`);

      const del = await fetch(`${API_URL}/api/ads/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!del.ok) return navigate(`/ad/${id}`);
      navigate("/");
    })();
  }, [id, user, navigate]);

  return <p>Removing…</p>;
};

export default AdRemove;
