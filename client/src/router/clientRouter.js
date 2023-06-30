import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddProduct from "../pages/add_product/AddProduct";
import ExcelTableGenerator from "../utils/xslxMaker/GenerateExcel";
import LastOrder from "../pages/last_order/LastOrder";
import AdminHome from "../pages/home_admin/HomeAdmin";
import UsersPage from "../pages/users_page/UsersPage";
import EditUser from "../pages/edit_user/EditUser";
import ProductsPage from "../pages/products_page/ProductsPage";
import EditProduct from "../pages/edit_product/EditProduct";

const ClientRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExcelTableGenerator />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="add/user" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/find/order/:userId" element={<LastOrder />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/edit/product/:id" element={<EditProduct/>}/>
      </Routes>
    </Router>
  );
};

export default ClientRouter;
