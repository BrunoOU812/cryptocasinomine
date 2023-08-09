import React from "react";

export default function Footer() {
  return (
    <div>
      {" "}
      <footer className="footer__section pt-60">
        <div className="container">
          <div className="footer__top pb-60">
            <div className="row g-5">
              <div
                className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-delay="0.9s"
              >
                <div className="widget__items">
                  <div className="footer-head">
                    <span href="#" className="footer-logo">
                      <h3 className="title">Casino</h3>
                    </span>
                  </div>
                  <div className="content-area">
                    <p>
                      Lorem ipsum dolor sit of the cart amet, consectetur
                      adipiscing elit. I talk out of the moon.
                    </p>
                    <h6>Follow Us</h6>
                    <ul className="social">
                      <li>
                        <span className="icon">
                          <i className="fa-brands fa-facebook-f"></i>
                        </span>
                      </li>
                      <li>
                        <span className="icon">
                          <i className="fa-brands fa-instagram"></i>
                        </span>
                      </li>
                      <li>
                        <span className="icon">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </span>
                      </li>
                      <li>
                        <span className="icon">
                          <i className="fa-brands fa-twitter"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xxl-3 col-xl-2 col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="widget__items">
                  <div className="footer-head">
                    <h3 className="title">Company</h3>
                  </div>
                  <div className="content-area">
                    <ul className="quick-link">
                      <li>
                        <span href="index.html">
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Home
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Slots
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Tournament
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Jackpots
                        </span>
                      </li>
                      <li>
                        <span href="livecasino.html">
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Live Games
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="widget__items">
                  <div className="footer-head">
                    <h3 className="title">Support</h3>
                  </div>
                  <div className="content-area">
                    <ul className="quick-link">
                      <li>
                        <span>
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Faqs
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src="assets/img/footer/rightarrow.png"
                            alt="angle"
                          />{" "}
                          Support
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xxl-4 col-xl-5 col-lg-4 col-md-6 col-sm-9 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="widget__items">
                  <div className="footer-head">
                    <h3 className="title">Subscribe Our Newslatter</h3>
                  </div>

                  <p>
                    Proin mauris ligula, pretium eu est ut, imperdiet imperdiet
                    massa. Nullam sodales ut orci vehicula aliquam. Suspendisse.
                  </p>
                  <div className="content-area">
                    <form action="#0">
                      <input
                        type="text"
                        placeholder="Enter Your Email address"
                      />
                      <button className="cmn--btn" type="submit">
                        <span>Subscribe</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="text-white">
              Copyright &copy; 2023,{" "}
              <span className="text--base">SportOdds</span> - All Right Reserved
            </p>
            <ul className="bottom__ling">
              <li>
                <span className="text-white">Affiliate program</span>
              </li>
              <li>
                <span className="text-white">Terms & conditions</span>
              </li>
              <li>
                <span className="text-white">Bonus terms & conditions</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
