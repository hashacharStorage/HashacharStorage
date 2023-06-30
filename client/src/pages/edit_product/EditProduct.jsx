import React, { useState, useEffect } from "react";
import "./editProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from "../../components/checkbox/Checkbox";
import RadioButtons from "../../components/radiobuttons/Radiobuttons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [selectedisBlack, setSelectedisBlack] = useState("");
  const [companies, setCompanies] = useState([]);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const handleCheckboxChange = (values) => {
    setCheckedCompanies(values);
  };
  const handleisBlackChange = (value) => {
    setSelectedisBlack(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/company/all"),
          axios.get(`http://localhost:5000/api/products/find/${id}`),
        ]);

        const companyFields = companyResponse.data
          .filter((item) => item.id !== 0)
          .map((item) => ({
            id: item.id,
            name: item.name,
          }));
        setProduct(productsResponse.data);
        setCompanies(companyFields);
        setCheckedCompanies(productsResponse.data.companies);
        setSelectedisBlack(productsResponse.data.isBlack);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isBlack = [
    { label: "ציוד סיראלי", value: false },
    { label: "ציוד שחור", value: true },
  ];

  const onSubmit = async (data) => {
    data.minQuantity = Number(data.minQuantity);
    for (const key in data) {
      if (data[key] == NaN) delete data[key];
      else if (data[key] == "") delete data[key];
    }
    if (product.companies !== checkedCompanies)
      data.companies = [0, ...checkedCompanies];

    if (product.isBlack !== selectedisBlack) data.isBlack = selectedisBlack;
    if (JSON.stringify(data) !== "{}") {
      const token = "Bearer " + Cookies.get("token");
      axios
        .put(
          `http://localhost:5000/api/products/find/${id}`,
          {
            ...data,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then(() => {
          alert("עריכת הפריט בוצעה בהצלחה!");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) alert(err.response.data.message);
          else alert("המערכת לא הצליחה להתחבר לשרת")
        });
    }
  };
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="body-container">
      <Navbar />
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="whiteboard-container">
          <h1>הוספת פריט חדש</h1>
          <div className="add-product-form">
            <input
              type="text"
              placeholder="קוד הפריט"
              defaultValue={product.serial}
              {...register("serial")}
            />
            <input
              type="text"
              placeholder="שם הפריט"
              defaultValue={product.title}
              {...register("title")}
            />
            <input
              type="number"
              placeholder="כמות מינימאלית"
              min="1"
              pattern="/^\d+$/"
              defaultValue={product.minQuantity}
              {...register("minQuantity")}
            />
            <input
              className="add-product-desc"
              type="text"
              placeholder="תיאור הפריט"
              defaultValue={product.desc}
              {...register("desc", {})}
            />
          </div>

          <Checkbox
            title={"חברה"}
            options={companies}
            checkedCompanies={checkedCompanies}
            onChange={handleCheckboxChange}
          />

          <RadioButtons
            // chosenOption={product.isBlack}
            title=":סוג ציוד"
            options={isBlack}
            checkedisBlack={selectedisBlack}
            onChange={handleisBlackChange}
          />
          <div className="add-product-submit-button" onClick={handleFormSubmit}>
            הוספת פריט
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
