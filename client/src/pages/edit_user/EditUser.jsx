import React, { useEffect, useState } from "react";
import "./editUser.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { isUserLoggedIn } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";

const EditUser = () => {
  const [companies, setCompanies] = useState([]);
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isAdmin = parseInt(Cookies.get("company"), 10) === 0;

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companyResponse, teamResponse, userResponse] = await Promise.all(
          [
            axios.get(clientConfig.API_PATH + "company/all"),
            axios.get(clientConfig.API_PATH + "team/all"),
            axios.get(`${clientConfig.API_PATH}users/find/${id}`, {
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

    if (!isUserLoggedIn()) {
      navigate("/login");
    } else fetchData();
  }, []);

  const onSubmit = async (data) => {
    const copydata = { ...data };

    copydata.team = Number(copydata.team);
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
          `${clientConfig.API_PATH}users/${id}`,
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
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.codeName == "DuplicateKey")
            alert("אימייל כבר בשימוש אצל משתמש אחר");
        });
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
                    readOnly={!isAdmin}
                    className={!isAdmin ? "read-only-input" : ""}
                    {...register("firstname")}
                  />
                  <input
                    type="text"
                    placeholder="שם משפחה"
                    defaultValue={user.lastname}
                    readOnly={!isAdmin}
                    className={!isAdmin ? "read-only-input" : ""}
                    {...register("lastname")}
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
                    placeholder="סיסמא"
                    {...register("password")}
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
                  <input
                    type="text"
                    placeholder="מידת חולצה"
                    defaultValue={user.shirtSize}
                    {...register("shirtSize")}
                  />
                  <div className="selects-container">
                    <select value={user.company} disabled>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>

                    {!isLoading && (
                      <select
                        {...register("villa")}
                        defaultValue={user.villa === true ? 1 : 0}
                        disabled={!isAdmin}
                      >
                        <option value="0">צוות רגיל</option>
                        <option value="1">צוות וילה</option>
                      </select>
                    )}

                    {!isLoading && (
                      <select {...register("team")} defaultValue={user.team}>
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    )}
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
