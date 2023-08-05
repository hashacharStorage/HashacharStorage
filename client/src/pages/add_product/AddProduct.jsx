import React, { useState, useEffect } from "react";
import "./addProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from "../../components/checkbox/Checkbox";
import RadioButtons from "../../components/radiobuttons/Radiobuttons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";

const AddProduct = () => {
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [selectedisBlack, setSelectedisBlack] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleCheckboxChange = (values) => {
    setCheckedCompanies(values);
  };
  const handleisBlackChange = (value) => {
    setSelectedisBlack(value);
  };
  const handleImageSelected = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "company/all"),
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

    if (!isUserAdmin()) {
      navigate("/home");
    } else fetchData();
  }, []);

  const isBlack = [
    { label: "ציוד סיראלי", value: false },
    { label: "ציוד שחור", value: true },
  ];

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: clientConfig.REACT_APP_IMGUR_TOKEN,
          },
        }
      );
      console.log(response.data.data);
      const uploadedImageUrl = response.data.data.link;
      console.log("Image uploaded:", uploadedImageUrl);
      return uploadedImageUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    //validations
    if (data.minQuantity === "") return;
    else {
      data.minQuantity = Number(data.minQuantity);
      if (data.minQuantity <= 0) {
        alert("Minimum quantity must be 1 or more.");
        return;
      }
    }
    if (checkedCompanies.length === 0) {
      alert("Please select at least one company.");
      return;
    }
    if (selectedisBlack === "") {
      alert("Please select the type of equipment (black or serial).");
      return;
    }

    try {
      if (selectedImage !== null) {
        const imageUrl = await handleImageUpload();
        if (imageUrl === null) {
          alert("שגיאה ביצירת הפריט נסה שוב מאוחר יותר");
          return;
        }
        console.log("here");
        data.image = imageUrl;
      }

      data.companies = [0, ...checkedCompanies];
      data.isBlack = selectedisBlack;
      data.minQuantity = Number(data.minQuantity);
      const token = "Bearer " + Cookies.get("token");
      await axios.post(
        clientConfig.API_PATH + "products/",
        { ...data },
        {
          headers: {
            token: token,
          },
        }
      );

      alert("הפריט נוצר בהצלחה");
      window.location.reload();
    } catch (err) {
      console.error("Error creating product:", err);
      alert("שגיאה ביצירת הפריט נסה שוב מאוחר יותר");
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="whiteboard-container">
          <h1>הוספת פריט חדש</h1>
          <form className="add-product-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder='מק"ט'
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
              type="file"
              accept="image/*"
              onChange={handleImageSelected}
            />

            <input
              type="number"
              placeholder="כמות מינימאלית"
              min="1"
              pattern="/^\d+$/"
              {...register("minQuantity", {
                required: true,
              })}
            />
            <input
              className="product-desc"
              type="text"
              placeholder="תיאור"
              {...register("desc", {})}
            />

            <Checkbox
              title={"חברה"}
              options={companies}
              checkedCompanies={checkedCompanies}
              onChange={handleCheckboxChange}
            />
            <RadioButtons
              title="סוג הציוד"
              options={isBlack}
              checkedisBlack={selectedisBlack}
              onChange={handleisBlackChange}
            />
            <SubmitButton
              title={"הוספת פריט"}
              oncllickhandle={handleFormSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
