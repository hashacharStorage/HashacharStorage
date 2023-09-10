import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";
import FormDetailsModal from "../../components/form_details_modal/FormDetailsModal";

const FormsPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [docId, setDocId] = useState("");
  const [docName, setDocName] = useState("");

  const token = "Bearer " + Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formsResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "form", {
            headers: {
              token: token,
            },
          }),
        ]);
        const forms = formsResponse.data;
        setForms(forms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isUserAdmin()) {
      navigate("/home");
    } else fetchData();
  }, []);

  const getInfo = async (_id,title) => {
    setDocId(_id);
    setDocName(title);
    setIsModal(true);
  };
  const downloadPdf = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        `${clientConfig.API_PATH}form/pdf/${docId}`,
        {
          data: data,
        },
        {
          headers: {
            token: token,
          },
          params: {
            formId: docId,
          },
          responseType: 'arraybuffer', // Specify the response type as 'arraybuffer'
        }
      );
  
      // Create a Blob from the binary PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a URL for the Blob
      const blobUrl = window.URL.createObjectURL(blob);
  
      // Create an anchor element for downloading the PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = `${docName}.pdf`; // Specify the filename
      downloadLink.style.display = 'none';
  
      // Append the anchor element to the document
      document.body.appendChild(downloadLink);
  
      // Trigger a click event on the anchor element to start the download
      downloadLink.click();
  
      // Remove the anchor element from the document
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (_id) => {
    const confirmed = window.confirm("האם אתה בטוח שאתה רוצה למחוק את הטופס?");
    console.log(clientConfig.API_PATH)
    if (confirmed) {
      axios
        .delete(`${clientConfig.API_PATH}form/find/${_id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          alert("הטופס נמחק בהצלחה");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) alert(err.response.data);
          else alert("אין חיבור לשרת");
        });
    }
  };

  const handleEditItem = (productId) => {
    console.log("first");
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <h1>רשימת טפסים</h1>
        {isModal && (
          <FormDetailsModal
            isOpen={true}
            onClose={() => setIsModal(false)}
            onSave={downloadPdf}
            isEdit={true}
          />
        )}
        {!isLoading && (
          <AdminList
            items={forms}
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            handleSelectItem={getInfo}
            type="forms"
          />
        )}
      </div>
    </div>
  );
};

export default FormsPage;
