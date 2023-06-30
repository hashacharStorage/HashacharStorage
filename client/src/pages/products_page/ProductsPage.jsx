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
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [blackProducts, setBlackProducts] = useState([]);
  const [serializedProducts, setSerializedProducts] = useState([]);

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const products = allProducts.find((product) => {
        if (product.company_id == selectedCompany) return product;
      });
      if (products) {
        setBlackProducts(products.blackProducts);
        setSerializedProducts(products.serializedProducts);
      } else {
        setBlackProducts([]);
        setSerializedProducts([]);
      }
    }
  }, [selectedCompany, isLoading]);

  const handleRemoveItem = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    const confirmed = window.confirm(
      "?האם ברצונך למחוק את הפריט"
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
          alert("המוצר נמחק בהצלחה");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditItem = (productId) => {
    // navigate(`/edit/product/${productId}`);
  };

  const handleCompanyChange = (e) => {
    const company_id = e.target.value;
    setSelectedCompany(company_id);
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="products-page-content-container">
        <h1>רשימת מוצרים לפי חברות</h1>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          {!isLoading &&
            allProducts.map((product) => (
              <option key={product.company_id} value={product.company_id}>
                {product.company_name}
              </option>
            ))}
        </select>
        {/* <h2>ציוד שחור</h2> */}
        {!isLoading && blackProducts && (
          <AdminList
            title={"ציוד שחור"}
            items={blackProducts}
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            type="products"
          />
        )}
        {!isLoading && (
          <AdminList
            title={"ציוד סיראלי"}
            items={serializedProducts}
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            type="products"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
