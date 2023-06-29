import React, { useState, useEffect } from "react";
import "./productsPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companiesResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/company/all", {
            headers: {
              token: token,
            },
          }),
          axios.get("http://localhost:5000/api/products/0", {
            headers: {
              token: token,
            },
          }),
        ]);

        const companies = companiesResponse.data;
        const products = productsResponse.data;
        const productByCompany = [];

        for (let i = 1; i < companies.length; i++) {
          console.log(companies[i].id);
          const blackProducts = [];
          const serializedProducts = [];
          products.forEach((product) => {
            if (product.companies.includes(companies[i].id)) {
              //product belongs to company
              if (product.isBlack) blackProducts.push(product);
              else serializedProducts.push(product);
            }
          });
          productByCompany.push({
            company_name: companies[i].name,
            company_id: companies[i].id,
            blackProducts,
            serializedProducts,
          });
        }
        setAllProducts(productByCompany);
        setIsLoading(false);
        console.log(productByCompany);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveProduct = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    const confirmed = window.confirm(
      "Are you sure you want to remove the product?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            token: token,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          alert("The product has been successfully removed");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit/product/${productId}`);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const findCorrect = (isBlack) => {
    const product = allProducts.find(
      (product) => product.company_id == selectedCompany
    );

    if (product) {
      return isBlack ? product.blackProducts : product.serializedProducts;
    }
  };

  return (
    <div className="products-page-container">
      <Navbar />
      <div className="products-page-content-container">
        <div className="top-list-container">
          <h1>רשימת מוצרים לפי חברות</h1>
          <select value={selectedCompany} onChange={handleCompanyChange}>
            {!isLoading &&
              allProducts.map((product) => (
                <option key={product.company_id} value={product.company_id}>
                  {product.company_name}
                </option>
              ))}
          </select>
        </div>
        <h2>ציוד שחור</h2>
        {!isLoading && (
          <AdminList
            items={findCorrect(true)}
            handleRemoveItem={handleRemoveProduct}
            handleEditItem={handleEditProduct}
            type="products"
          />
        )}

        <h2>ציוד סיריאלי</h2>
        {/* {!isLoading && (
          <AdminList
            items={findCorrect(false)}
            handleRemoveItem={handleRemoveProduct}
            handleEditItem={handleEditProduct}
            type="products"
          />
        )} */}
      </div>
    </div>
  );
};

export default ProductsPage;
