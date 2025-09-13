import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, imgSrc } from "../../../config";

const Ad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s) => s.users);
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);

  const isAuthor =
    user &&
    ad &&
    ad.seller &&
    (ad.seller._id === user.id || ad.seller === user.id);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/ads/${id}`, {
          credentials: "include",
        });
        if (res.status === 404) {
          setError("Not found");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setAd(data);
      } catch (e) {
        if (!ignore) setError(String(e));
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!ad) return <p>Loading…</p>;

  const created = ad.createdAt ? new Date(ad.createdAt).toLocaleString() : "";

  const handleDelete = async () => {
    if (!window.confirm("Delete this ad?")) return;
    const r = await fetch(`${API_URL}/api/ads/${ad._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (r.status === 403) return alert("You are not the author.");
    if (!r.ok) return alert("Delete failed.");
    navigate("/");
  };

  return (
    <article>
      <h1 className="mb-3">{ad.title}</h1>
      {ad.photo && (
        <img
          src={imgSrc(ad.photo)}
          alt={ad.title}
          style={{ maxWidth: "100%", borderRadius: 8 }}
        />
      )}
      <div className="mt-3">
        <div className="mb-1">
          <strong>{ad.price} zł</strong> · {ad.location}
        </div>
        <div className="text-muted">Published: {created}</div>
      </div>

      <p className="mt-3">{ad.content}</p>

      {ad.seller && (
        <div className="mt-3 p-3 border rounded">
          <div className="fw-semibold mb-2">Seller</div>
          <div>Login: {ad.seller.login || ad.seller}</div>
          {ad.seller.avatar && (
            <img
              src={imgSrc(ad.seller.avatar)}
              alt="avatar"
              width={64}
              height={64}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
          {ad.seller.phone && (
            <div className="mt-2">
              Phone: <a href={`tel:${ad.seller.phone}`}>{ad.seller.phone}</a>
            </div>
          )}
        </div>
      )}

      {isAuthor && (
        <div className="mt-3 d-flex gap-2">
          <Link className="btn btn-outline-primary" to={`/ad/edit/${ad._id}`}>
            Edit
          </Link>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default Ad;
