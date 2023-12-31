import React, { useState, useEffect } from "react";
import "./productsPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [blackProducts, setBlackProducts] = useState([]);
  const [serializedProducts, setSerializedProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companiesResponse, productsResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "company/all", {
            headers: {
              token: token,
            },
          }),
          axios.get(clientConfig.API_PATH + "products/0", {
            headers: {
              token: token,
            },
          }),
        ]);

        const companies = companiesResponse.data;
        const products = productsResponse.data;
        const productByCompany = [];

        for (let i = 1; i < companies.length; i++) {
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

    if (!isUserAdmin()) {
      navigate("/home");
    } else fetchData();
  }, [reload]);

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
    const confirmed = window.confirm("?האם ברצונך למחוק את הפריט");
    if (confirmed) {
      axios
        .delete(`${clientConfig.API_PATH}products/${id}`, {
          headers: {
            token: token,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          alert("המוצר נמחק בהצלחה");
          setReload(!reload);
        })
        .catch((err) => {
          if (err.response) alert(err.response.data);
          else alert("אין חיבור לשרת");
        });
    }
  };

  const handleEditItem = (productId) => {
    navigate(`/edit/product/${productId}`);
  };

  const handleCompanyChange = (e) => {
    const company_id = e.target.value;
    setSelectedCompany(company_id);
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <h1>רשימת מוצרים לפי חברות</h1>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          {!isLoading &&
            allProducts.map((product) => (
              <option key={product.company_id} value={product.company_id}>
                {product.company_name}
              </option>
            ))}
        </select>
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
