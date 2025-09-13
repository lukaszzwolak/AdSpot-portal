import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const phrase = q.trim();
    if (!phrase) return;
    navigate(`/search/${encodeURIComponent(phrase)}`);
  };

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
