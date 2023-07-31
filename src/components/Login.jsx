import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "./login",
        {
          email: "Admin",
          password: "Test123",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      );

      const accessToken = response.data.token;
      localStorage.setItem("access_token", accessToken);
      console.log("Inicio de sesión exitoso. Token de acceso:", accessToken);
      toast.success("success");
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
                          <form action="#0" onSubmit={handleLogin}>
                            <div className="form__grp">
                              <label htmlFor="email34">Email</label>
                              <input
                                type="text"
                                placeholder="User"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                              />
                            </div>
                            <div className="form__grp">
                              <label htmlFor="toggle-password9">Confrim</label>
                              <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <span className="fa fa-fw fa-eye field-icon toggle-password9"></span>
                            </div>
                            <div className="create__btn">
                              <button type="submit" className="cmn--btn">
                                <span>Sign Up</span>
                              </button>
                            </div>
                            <p>
                              Do you have an account? <a href="#0">Login</a>
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
