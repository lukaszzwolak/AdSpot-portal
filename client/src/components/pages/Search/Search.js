import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import AdCard from "../../features/AdCard/AdCard";

const Search = () => {
  const { searchPhrase } = useParams();
  const [ads, setAds] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchPhrase) return;
    (async () => {
      try {
        const r = await fetch(
          `${API_URL}/api/ads/search/${encodeURIComponent(searchPhrase)}`,
          {
            credentials: "include",
          }
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setAds(await r.json());
      } catch (e) {
        setError(String(e));
      }
    })();
  }, [searchPhrase]);

  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!ads) return <p>Loading…</p>;
  if (ads.length === 0) return <p>No results for “{searchPhrase}”.</p>;

  return (
    <>
      <h1 className="mb-3">Results for “{searchPhrase}”</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {ads.map((ad) => (
          <div className="col" key={ad._id}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
