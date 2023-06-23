import React, { useState, useEffect } from "react";
import "./addProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from "../../components/checkbox/Checkbox";
import RadioButtons from "../../components/radiobuttons/Radiobuttons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

const AddProduct = () => {
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [selectedisBlack, setSelectedisBlack] = useState("");
  const [companies, setCompanies] = useState([]);

  const { register, handleSubmit } = useForm();

  const handleCheckboxChange = (values) => {
    setCheckedCompanies(values);
  };
  const handleisBlackChange = (value) => {
    setSelectedisBlack(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/company/all"),
        ]);

        const companyFields = companyResponse.data
          .filter((item) => item.id !== 0)
          .map((item) => ({
            id: item.id,
            name: item.name,
          }));

        setCompanies(companyFields);
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
    //validations
    if (data.minQuantity === "") return;
    else {
      data.minQuantity = Number(data.minQuantity);
      if (data.minQuantity <= 0) {
        alert("כמות מינימאלית חייבת להיות 1 או יותר");
        return;
      }
    }
    if (checkedCompanies.length === 0) {
      alert("חובה לבחור לפחות חברה אחת");
      return;
    }
    if (selectedisBlack === "") {
      alert("חובה לבחור האם הציוד שחור או סיראלי");
      return;
    }

    data.companies = [0, ...checkedCompanies];
    data.isBlack = selectedisBlack;
    data.minQuantity = Number(data.minQuantity);
    console.log(data);
    const token = "Bearer " + Cookies.get("token");
    axios
      .post(
        "http://localhost:5000/api/products/",
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
        alert("הפריט נוצר בהצלחה!");
        window.location.reload();
      })
      .catch((err) => alert(err.response.data.message));
  };
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <>
      <Navbar />
      <div className="body-container">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="whiteboard-container">
            <h1>הוספת פריט חדש</h1>
            <div className="add-product-form">
              <input
                type="text"
                placeholder="קוד הפריט"
                {...register("serial", {
                  required: true,
                })}
              />
              <input
                type="text"
                placeholder="שם הפריט"
                {...register("title", {
                  required: true,
                })}
              />
              <input
                type="number"
                placeholder="כמות מינימאלית"
                min="1"
                pattern="/^\d+$/"
                defaultValue="1"
                {...register("minQuantity", {
                  required: true,
                })}
              />
              <input
                className="add-product-desc"
                type="text"
                placeholder="תיאור הפריט"
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
              title=":סוג ציוד"
              options={isBlack}
              checkedisBlack={selectedisBlack}
              onChange={handleisBlackChange}
            />
            <div
              className="add-product-submit-button"
              onClick={handleFormSubmit}
            >
              הוספת פריט
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
