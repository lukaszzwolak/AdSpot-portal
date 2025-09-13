import { useParams } from "react-router-dom";

const Search = () => {
  const { searchPhrase } = useParams();
  // TODO GET /api/ads/search/:searchPhrase i pokaż listę
  return <h1>Search: {searchPhrase || "(type something)"} </h1>;
};
export default Search;
