import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { API_URL } from "../../../config";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(logIn(data));
          setStatus("success");
        } else if (res.status === 400 || res.status === 401) {
          setStatus("clientError");
        } else {
          setStatus("serverError");
        }
      })
      .catch(() => setStatus("serverError"));
  };

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Log in</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged in!</p>
        </Alert>
      )}
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect...</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
