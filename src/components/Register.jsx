import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useUI } from "../contexts/UIContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { register, error, handleSubmit, reset } = useForm();
  const { setShowLogin, setShowRegistered, api, setCustomerData, setLogged } =
    useUI();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await axios.get(
        `${api}/api/customers?name=${data.name}`
      );
      console.log(response);
      if (response.data.data[0]) {
        toast.error("User already exists!");
      } else {
        const user = {
          name: data.name,
          email: data.email,
          status: data.password,
          muted: false,
          tokens: 0,
        };
        await axios.post(`${api}/api/customers?name=${data.name}`, user);
        const response = await axios.get(
          `${api}/api/customers?name=${data.name}`
        );
        setCustomerData(response.data.data[0]);
        setLogged(true);
        toast.success("Created successfully!");
        reset();
        setShowRegistered(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error("Error", error.message);
    }
  };
  return (
    <div
      className="modal register__modal show"
      tabIndex="-1"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 3,
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={() => {
                setShowRegistered(false);
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row align-items-center g-4">
                <div className="col">
                  <div className="modal__right">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade"
                        role="tabpanel"
                        aria-labelledby="#home-tab1"
                      ></div>
                      <div
                        className="tab-pane fade active show"
                        role="tabpanel"
                        aria-labelledby="#contact-tab3"
                      >
                        <div className="form__tabs__wrap">
                          <form
                            action="#0"
                            onSubmit={handleSubmit(handleLogin)}
                          >
                            <div className="form__grp">
                              <label htmlFor="name">User name</label>
                              <input
                                type="text"
                                name="name"
                                placeholder="User name"
                                {...register("name")}
                              />
                            </div>
                            <div className="form__grp">
                              <label htmlFor="">Email</label>
                              <input
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                {...register("email")}
                              />
                            </div>
                            <div className="form__grp">
                              <label htmlFor="">Password</label>
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...register("password")}
                              />
                            </div>
                            {/* <div className="form__grp">
                              <label htmlFor="toggle-password9">Confrim</label>
                              <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <span className="fa fa-fw fa-eye field-icon toggle-password9"></span>
                            </div> */}
                            <div className="create__btn">
                              <input
                                type="submit"
                                className="cmn--btn"
                                style={{ color: "white" }}
                                value="Sign up"
                              />
                            </div>
                            <p>
                              Do you have an account?{" "}
                              <a
                                href="#0"
                                onClick={() => {
                                  setShowLogin((prevState) => !prevState);
                                  setShowRegistered(false);
                                }}
                              >
                                Login
                              </a>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
