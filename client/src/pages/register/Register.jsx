import React, { useEffect, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

const Register = () => {
  const [companies, setCompanies] = useState([]);
  const [teams, setTeams] = useState([]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse, teamResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/company/all"),
          axios.get("http://localhost:5000/api/team/all"),
        ]);

        const companyFields = companyResponse.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setCompanies(companyFields);

        const teamFields = teamResponse.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setTeams(teamFields);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    if (data.shirtSize === "") delete data.shirtSize;
    if (data.villa == 0) data.villa = false;
    else data.villa = true;
    data.company = Number(data.company);
    data.team = Number(data.team);
    data.warehouse = Number(data.warehouse);
    console.log(data);
    const token = "Bearer " + Cookies.get("token");
    axios
      .post(
        "http://localhost:5000/api/auth/register",
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
        alert("משתמש נרשם בהצלחה!");
        window.location.reload();
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <>
      <Navbar />
      <div className="body-container">
        <div className="whiteboard-container">
          <div className="register-content-container">
            <h1>רישום טכנאי חדש</h1>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="שם פרטי"
                {...register("firstname", {
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
                placeholder="סיסמא"
                {...register("password", {
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
                {...register("shirtSize", {})}
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
              <select {...register("team")}>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <select {...register("villa")}>
                <option value="0">צוות רגיל</option>
                <option value="1">צוות וילה</option>
              </select>
              <select {...register("company")}>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
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
