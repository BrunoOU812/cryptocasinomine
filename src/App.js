import "./assets/img/logo/favicon.png";
import "./assets/css/bootstrap.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.css";
import "./assets/css/nice-select.css";
import "./assets/glyphter-font/css/Glyphter.css";
import "./assets/css/animate.css";
import "./assets/css/all.min.css";
import "./assets/css/main.css";
import UIContext from "./contexts/UIContext";
import PageContainer from "./components/general/PageContainer";
import React, { useEffect } from "react";
import Chat from "./components/general/Chat";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UIContext>
      <Chat></Chat>
      <PageContainer></PageContainer>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </UIContext>
  );
}

export default App;
