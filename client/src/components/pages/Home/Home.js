import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import AdCard from "../../features/AdCard/AdCard";
import SearchBar from "../../features/SearchBar/SearchBar";

const Home = () => {
  const [ads, setAds] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/ads`, { credentials: "include" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setAds(data);
      } catch (e) {
        setError(String(e));
      }
    })();
  }, []);

  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!ads) return <p>Loading…</p>;

  return (
    <>
      <SearchBar />
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

export default Home;
