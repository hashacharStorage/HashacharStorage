import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddProduct from "../pages/add_product/AddProduct";
import ExcelTableGenerator from "../utils/xslxMaker/GenerateExcel";
import LastOrder from "../pages/last_order/LastOrder";

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExcelTableGenerator />} />
        <Route path="/home" element={<Home />} />
        <Route path="add/user" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/find/order/:userId" element={<LastOrder />} />
      </Routes>
    </Router>
  );
};

export default ClientRouter;
