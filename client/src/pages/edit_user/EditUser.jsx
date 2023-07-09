import React, { useEffect, useState } from "react";
import "./editUser.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";

const EditUser = () => {
  const [companies, setCompanies] = useState([]);
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      Cookies.get("token") === undefined ||
      Cookies.get("company") === undefined
    ) {
      navigate("/login");
    } else if (Cookies.get("company") != 0) {
      navigate("/home");
    }

    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companyResponse, teamResponse, userResponse] = await Promise.all(
          [
            axios.get("http://localhost:5000/api/company/all"),
            axios.get("http://localhost:5000/api/team/all"),
            axios.get(`http://localhost:5000/api/users/find/${id}`, {
              headers: {
                token: token,
              },
              params: {
                id: id,
              },
            }),
          ]
        );

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

        setUser(userResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const copydata = { ...data };

    copydata.team = Number(copydata.team);
    copydata.warehouse = Number(copydata.warehouse);
    copydata.villa == 0 ? (copydata.villa = false) : (copydata.villa = true);

    for (const key in copydata) {
      if (copydata[key] === NaN) delete copydata[key];
      else if (copydata[key] === "") delete copydata[key];
      else if (copydata[key] == user[key]) delete copydata[key];
    }
    const token = "Bearer " + Cookies.get("token");
    if (JSON.stringify(copydata) !== "{}") {
      axios
        .put(
          `http://localhost:5000/api/users/${id}`,
          {
            ...copydata,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then(() => {
          alert("פרטי המשתמש עודכנו בהצלחה");
          window.location.reload();
        })
        .catch((err) => console.log(err.response));
    } else alert("לא בוצע שינוי בפרטים");
  };
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="whiteboard-container">
          <div className="update-content-container">
            <h1>עריכת פרטי משתמש</h1>
            <form className="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
              {user && (
                <>
                  <input
                    type="text"
                    placeholder="שם פרטי"
                    defaultValue={user.firstname}
                    {...register("firstname")}
                  />
                  <input
                    type="text"
                    placeholder="שם משפחה"
                    defaultValue={user.lastname}
                    {...register("lastname")}
                  />
                  <input
                    type="text"
                    placeholder="סיסמא"
                    {...register("password")}
                  />
                  <input
                    type="text"
                    placeholder="אימייל"
                    defaultValue={user.email}
                    {...register("email", {
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  <input
                    type="text"
                    placeholder="מידת חולצה"
                    defaultValue={user.shirtSize}
                    {...register("shirtSize")}
                  />
                  <input
                    type="number"
                    placeholder="מספר מחסן"
                    min="0"
                    pattern="^\d+$"
                    defaultValue={user.warehouse}
                    readOnly={true}
                    className="read-only-input"
                    {...register("warehouse")}
                  />
                  <div className="selects-container">
                    {!isLoading && (
                      <select {...register("team")} defaultValue={user.team}>
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {!isLoading && (
                      <select
                        {...register("villa")}
                        defaultValue={user.villa === true ? 1 : 0}
                      >
                        <option value="0">צוות רגיל</option>
                        <option value="1">צוות וילה</option>
                      </select>
                    )}

                    <select value={user.company} disabled>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <SubmitButton
                    title="עריכת פרטים"
                    oncllickhandle={handleFormSubmit}
                  />
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
