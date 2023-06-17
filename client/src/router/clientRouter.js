import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>henlo</h1>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default ClientRouter;
