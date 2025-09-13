import { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const isImage = (file) =>
  file && ["image/png", "image/jpeg", "image/gif"].includes(file.type);

const AdForm = ({ initial = null, mode = "add", onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setContent(initial.content || "");
      setPrice(initial.price ?? "");
      setLocation(initial.location || "");
    }
  }, [initial]);

  const validate = () => {
    if (title.trim().length < 10 || title.trim().length > 50)
      return "Title must be 10–50 chars.";
    if (content.trim().length < 20 || content.trim().length > 1000)
      return "Content must be 20–1000 chars.";
    const num = Number(price);
    if (Number.isNaN(num) || num < 0) return "Price must be a number ≥ 0.";
    if (location.trim().length < 2 || location.trim().length > 100)
      return "Location must be 2–100 chars.";
    if (mode === "add" && !photo) return "Photo is required.";
    if (photo && !isImage(photo)) return "Photo must be png/jpg/gif.";
    if (photo && photo.size > (mode === "add" ? 2 : 2) * 1024 * 1024)
      return "Photo size exceeds 2MB.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus("error");
      setMsg(v);
      return;
    }
    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("content", content.trim());
    fd.append("price", String(price));
    fd.append("location", location.trim());
    if (photo) fd.append("photo", photo);

    try {
      setStatus("loading");
      await onSubmit(fd);
    } catch (e) {
      setStatus("error");
      setMsg(e.message || "Unexpected error");
      return;
    } finally {
      setStatus(null);
    }
  };

  return (
    <Form className="col-12 col-lg-6" onSubmit={handleSubmit}>
      <h1 className="my-4">{mode === "add" ? "Add Ad" : "Edit Ad"}</h1>

      {status === "error" && (
        <Alert variant="danger" className="mb-3">
          {msg}
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mb-3" />
      )}

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={10}
          maxLength={50}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minLength={20}
          maxLength={1000}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="1"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          minLength={2}
          maxLength={100}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>
          Photo {mode === "add" ? "(required)" : "(optional)"}
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/png,image/jpeg,image/gif"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {mode === "add" ? "Create" : "Save changes"}
      </Button>
    </Form>
  );
};

export default AdForm;
