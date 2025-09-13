import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdRemove = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO DELETE /api/ads/:id z credentials
    // po sukcesie:
    // navigate("/");
  }, [id, navigate]);

  return <h1>Removing Ad {id}…</h1>;
};
export default AdRemove;
