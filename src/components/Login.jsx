import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useUI } from "../contexts/UIContext";
import { useForm } from "react-hook-form";
export default function Login() {
  const {
    showLogin,
    setShowLogin,
    setShowRegistered,
    setLogged,
    setCustomerData,
    api,
  } = useUI();
  const { register, reset, error, handleSubmit } = useForm();
  const handleLogin = async (data) => {
    try {
      const response = await axios.get(
        `${api}/api/customers?name=${data.name}`
      );
      console.log("id", response.data.data[0].id);
      if (response.data.data.length > 0) {
        toast.success("Logged successfully!");
        reset();
        setLogged(true);
        setShowLogin(false);
        setCustomerData(response.data.data[0]);
      } else {
        toast.error("User non existant!");
      }
    } catch (error) {
      toast.error("Error!");
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
                setShowLogin(false);
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
                              <label htmlFor="email34">Your user name</label>
                              <input
                                name="name"
                                type="text"
                                placeholder="User name"
                                {...register("name")}
                              />
                            </div>
                            <div className="create__btn">
                              <input
                                style={{ color: "white" }}
                                type="submit"
                                className="cmn--btn"
                                value="Log in"
                              />
                            </div>
                            <p>
                              Don't have an account?{" "}
                              <a
                                href="#0"
                                onClick={() => {
                                  setShowRegistered((prevState) => !prevState);
                                  setShowLogin(false);
                                }}
                              >
                                Register
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
