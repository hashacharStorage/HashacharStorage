import React from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Check if any required field is empty
    if (Object.values(errors).some((error) => error.type === "required")) {
      alert("Please fill in all required fields.");
      return; // Stop submission
    }
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="body-container">
        <div className="whiteboard-container">
          <div className="register-content-container">
            <h1>רישום טכנאי חדש</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
              <input
                type="text"
                placeholder="סיסמא"
                {...register("password", {
                  required: true,
                })}
              />
              <input
                type="text"
                placeholder="שם משפחה"
                {...register("lastname", { required: true })}
              />
              <input
                type="text"
                placeholder="שם פרטי"
                {...register("firstname", {
                  required: true,
                })}
              />
              <input
                type="text"
                placeholder="אימייל"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <input
                type="text"
                placeholder="מידת חולצה"
                {...register("shirt", {
                  required: true,
                })}
              />
              <input
                type="number"
                placeholder="מספר מחסן"
                min="0"
                pattern="/^\d+$/"
                {...register("warehouse", {
                  required: true,
                })}
              />
              <select {...register("selectedTeam")}>
                <option value="מרכז">איזור מרכז</option>
                <option value="צפון">איזור צפון</option>
                <option value="דרום">איזור צפון</option>
              </select>
              <select {...register("selectedVila")}>
                <option value="צוות רגיל">צוות רגיל</option>
                <option value="צוות וילה">צוות וילה</option>
              </select>
              <select {...register("selectedCompany")}>
                <option value="cellcom">cellcom</option>
                <option value="yes">yes</option>
                <option value="admin">admin</option>
              </select>
              <button className="submit-button" type="submit">
                הרשמה
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
