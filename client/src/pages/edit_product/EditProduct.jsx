import React, { useState, useEffect } from "react";
import "./editProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from "../../components/checkbox/Checkbox";
import RadioButtons from "../../components/radiobuttons/Radiobuttons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [selectedisBlack, setSelectedisBlack] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
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
        const [companyResponse, productsResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "company/all"),
          axios.get(`${clientConfig.API_PATH}products/find/${id}`),
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
        console.log(productsResponse.data);
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
            Authorization: `Bearer ${clientConfig.REACT_APP_IMGUR_TOKEN}`,
          },
        }
      );
      const uploadedImageUrl = response.data.data.link;
      console.log("Image uploaded:", uploadedImageUrl);
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const deleteImage = async () => {
    const regex = /\/([a-zA-Z0-9]+)\.(jpg|png|gif|jpeg)$/i;
    const match = product.image.match(regex);
    const imageID = match ? match[1] : null;

    console.log(imageID);

    await axios.delete(`https://api.imgur.com/3/image/${imageID}`, {
      headers: {
        Authorization: `Bearer ${clientConfig.REACT_APP_IMGUR_TOKEN}`,
      },
    });
  };

  const onSubmit = async (data) => {
    try {
      if (selectedImage !== null) {
        await deleteImage();
        const imageUrl = await handleImageUpload();
        if (imageUrl === null) {
          alert("שגיאה ביצירת הפריט נסה שוב מאוחר יותר");
          return;
        }
        data.image = imageUrl;
      }
    } catch (error) {
      alert("שגיאה בהעלאת תמונה אנא נסה מואחר יותר");
      return;
    }
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
          `${clientConfig.API_PATH}products/find/${id}`,
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
          else alert("המערכת לא הצליחה להתחבר לשרת");
        });
    }
  };
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="whiteboard-container">
          <h1>עדכון פריט</h1>
          <form
            className="update-product-form"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelected}
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
                className="product-desc"
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
              title=":סוג ציוד"
              options={isBlack}
              checkedisBlack={selectedisBlack}
              onChange={handleisBlackChange}
            />
            <SubmitButton
              title="עריכת פריט"
              oncllickhandle={handleFormSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
