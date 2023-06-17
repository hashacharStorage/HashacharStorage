import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>henlo</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
};

export default ClientRouter;
