import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config";
import AdForm from "../../features/AdForm/AdForm";

const AdEdit = () => {
  const { id } = useParams();
  const user = useSelector((s) => s.users);
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/ads/${id}`, {
          credentials: "include",
        });
        if (r.status === 404) return setError("Not found");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        const isAuthor =
          user &&
          data.seller &&
          (data.seller._id === user.id || data.seller === user.id);
        if (!user || !isAuthor) return navigate("/");
        setAd(data);
      } catch (e) {
        setError(String(e));
      }
    })();
  }, [id, user, navigate]);

  const onSubmit = async (fd) => {
    const r = await fetch(`${API_URL}/api/ads/${id}`, {
      method: "PUT",
      credentials: "include",
      body: fd,
    });
    if (r.status === 400) throw new Error("Validation error");
    if (r.status === 401) throw new Error("Not logged in");
    if (r.status === 403) throw new Error("Not an author");
    if (!r.ok) throw new Error("Server error");
    const updated = await r.json();
    navigate(`/ad/${updated._id}`);
  };

  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!ad) return <p>Loading…</p>;

  return <AdForm mode="edit" initial={ad} onSubmit={onSubmit} />;
};

export default AdEdit;
