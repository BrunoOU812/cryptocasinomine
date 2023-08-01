import React from "react";

export default function Slots() {
  return (
    <div>
      <div classNameName="container">
        <div className="preview">
          <img src="//oi63.tinypic.com/2u76br5.jpg" />
        </div>
        <h2 className="text-center text-light my-3 gold">
          <i className="fab fa-phoenix-framework gold"></i> Slot Game
        </h2>
        <div className="row justify-content-center mb-3">
          <div className="col col-auto">
            <canvas id="slot" width="440" height="240"></canvas>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col col-auto">
            <div className="input-group mb-3 w-75 m-auto">
              <div className="input-group-prepend">
                <span className="input-group-text">Current WIN</span>
              </div>
              <input
                type="text"
                className="form-control w-auto"
                id="cwin"
                value="0"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col col-auto">
            <button className="btn btn-danger px-5" id="spin">
              <i className="fas fa-sync-alt"></i> SPIN
            </button>
            <button className="btn btn-secondary px-5" id="auto">
              <i className="fab fa-android"></i> AUTO (OFF)
            </button>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col col-auto">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Credits</span>
              </div>
              <input
                className="form-control"
                type="number"
                id="balance"
                min="1"
                max="5000"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fas fa-dollar-sign green"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col col-auto">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">BETx</span>
              </div>
              <input
                className="form-control"
                type="number"
                id="bet"
                min="1"
                value="1"
                max="3"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fas fa-coins gold"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col col-auto">
            <select id="mode" className="btn btn-default">
              <option value="random">Random</option>
              <option value="fixed">Fixed</option>
            </select>
            <select id="where" className="btn btn-default">
              <option value="top">top</option>
              <option value="middle">middle</option>
              <option value="bottom">bottom</option>
            </select>
            <select id="what" className="btn btn-default"></select>
          </div>
        </div>
        <div className="row justify-content-center my-3">
          <div className="col col-auto">
            <button
              className="btn btn-warning w-auto"
              type="button"
              id="checkout"
            >
              <i className="fas fa-money-bill-alt"></i> CHECKOUT
            </button>
            <button
              className="btn btn-primary w-auto"
              type="button"
              data-toggle="modal"
              data-target="#payTable"
            >
              <i className="fas fa-money-bill-alt"></i> Pay Table
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="payTable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="payTableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="payTableTitle">
                Pay Table
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table
                className="table table-dark table-hover table-responsive"
                style={{ overflow: "hidden" }}
              >
                <thead>
                  <tr>
                    <td>Reel1</td>
                    <td>Reel2</td>
                    <td>Reel3</td>
                    <td>TOP</td>
                    <td>MIDDLE</td>
                    <td>BOTTOM</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">2000xBET</td>
                    <td className="v-align">1000xBET</td>
                    <td className="v-align">4000xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">150xBET</td>
                    <td className="v-align">150xBET</td>
                    <td className="v-align">150xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/7.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/Cherry.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">75xBET</td>
                    <td className="v-align">75xBET</td>
                    <td className="v-align">75xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">50xBET</td>
                    <td className="v-align">50xBET</td>
                    <td className="v-align">50xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">20xBET</td>
                    <td className="v-align">20xBET</td>
                    <td className="v-align">20xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">10xBET</td>
                    <td className="v-align">10xBET</td>
                    <td className="v-align">10xBET</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td>
                      <img
                        src="https://n1md7.github.io/slot-game/img/BAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/2xBAR.png"
                        width="40"
                      />
                      <img
                        src="https://n1md7.github.io/slot-game/img/3xBAR.png"
                        width="40"
                      />
                    </td>
                    <td className="v-align">5xBET</td>
                    <td className="v-align">5xBET</td>
                    <td className="v-align">5xBET</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <a href="https://github.com/n1md7/slot-game" target="_blank">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
