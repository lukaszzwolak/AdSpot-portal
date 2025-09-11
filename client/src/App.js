import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

//layout
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/Header/Header";

//pages
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import Search from "./components/pages/Search/Search";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Logout from "./components/pages/Logout/Logout";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
  return (
    <main>
      <Container>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AdEdit />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
};

export default App;
