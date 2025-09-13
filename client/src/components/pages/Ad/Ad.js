import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, imgSrc } from "../../../config";

const Ad = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/ads/${id}`, {
          credentials: "include",
        });
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

  return (
    <article>
      <h1>{ad.title}</h1>
      {ad.photo && (
        <img
          src={imgSrc(ad.photo)}
          alt={ad.title}
          style={{ maxWidth: "100%", borderRadius: 8 }}
        />
      )}
      <p className="mt-3">{ad.content}</p>
      <p>
        <strong>{ad.price}</strong> · {ad.location}
      </p>
      {ad.seller && (
        <div className="mt-2">
          <div>Seller: {ad.seller.login}</div>
          {ad.seller.phone && (
            <a href={`tel:${ad.seller.phone}`}>{ad.seller.phone}</a>
          )}
        </div>
      )}
    </article>
  );
};

export default Ad;
