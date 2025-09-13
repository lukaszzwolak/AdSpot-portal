import { useParams } from "react-router-dom";

const AdEdit = () => {
  const { id } = useParams();
  // TODO pobierz dane ogłoszenia i wyświetl formularz (PUT /api/ads/:id)
  return <h1>Edit Ad {id}</h1>;
};
export default AdEdit;
