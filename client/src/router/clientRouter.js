import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddProduct from "../pages/add_product/AddProduct";

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>henlo</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add/product" element={<AddProduct />} />

      </Routes>
    </Router>
  );
};

export default ClientRouter;
