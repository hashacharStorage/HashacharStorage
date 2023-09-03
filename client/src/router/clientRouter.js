import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import AddProduct from '../pages/add_product/AddProduct';
import LastOrder from '../pages/last_order/LastOrder';
import AdminHome from '../pages/home_admin/HomeAdmin';
import UsersPage from '../pages/users_page/UsersPage';
import EditUser from '../pages/edit_user/EditUser';
import ProductsPage from '../pages/products_page/ProductsPage';
import EditProduct from '../pages/edit_product/EditProduct';
import AddCompany from '../pages/add_company/AddCompany';
import CompaniesPage from '../pages/companies_page/CompaniesPage';
import EditCompany from '../pages/edit_company/EditCompny'
import Default from '../pages/default/Default';
import FormGenerator from '../pages/form_generator/FormGenerator';

const ClientRouter = () => {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Default />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/form-generator" element={<FormGenerator/>}/>
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/add/user" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/find/order/:userId" element={<LastOrder />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/edit/product/:id" element={<EditProduct />} />
        <Route path="/add/company" element={<AddCompany />} />
        <Route path="/admin/companies" element={<CompaniesPage />} />
        <Route path="/edit/company/:id" element={<EditCompany />} />
      </Routes>
    </Router>
  );
};

export default ClientRouter;
