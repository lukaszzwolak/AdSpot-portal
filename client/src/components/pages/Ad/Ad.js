import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Ad = () => {
  const { id } = useParams();
  useEffect(() => {
    // TODO fetch(`/api/ads/${id}`) z API_URL + credentials
  }, [id]);

  return (
    <div>
      <h1>Ad details</h1>
      <p>ID: {id}</p>
      {/*TODO pokaż tytuł, zdjęcie, opis, sprzedawcę*/}
    </div>
  );
};

export default Ad;
