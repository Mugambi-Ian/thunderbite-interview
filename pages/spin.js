import React from "react";
import { downloadObjectAsJSON, SERVER_URL } from "../utils";

export default class Spin extends React.Component {
  state = {
    spinValue: null,
    spin: true,
  };

  valueList = [
    { POSITION: 1, BG_C: "#feb2e8" },
    { POSITION: 2, BG_C: "#ff9c0a" },
    { POSITION: 3, BG_C: "#bbd2fe" },
    { POSITION: 4, BG_C: "#a2ea7c" },
  ];

  async spinClk() {
    if (!this.state._spinClicked) {
      this.setState({ _spinClicked: true });
      const res = await this.connect2Server();
      if (res.status === 200) {
        const { deg, secs } = res.data;
        if (deg % 10 === 0) deg = deg - 45;
        const el = document.getElementById("wheel");
        el.style.transition = `all ${secs}s`;
        el.style.transform = "rotate(" + deg + "deg)";
        const pos = this.getQuadrant(deg % 360);
        await setTimeout(() => {
          this.setState({
            spinValue: this.valueList[pos],
            spin: false,
            deg,
            _spinClicked: false,
          });
        }, secs * 1000);
      }
    } else alert("loading");
  }

  async connect2Server() {
    try {
      const response = await fetch(SERVER_URL + "/runRandom");
      if (response.status !== 200) {
        alert("Connection Error");
        return { status: 404 };
      } else {
        return { data: await response.json(), status: 200 };
      }
    } catch (e) {
      alert(e.message);
      this.setState({
        _spinClicked: false,
      });
      return { status: 404 };
    }
  }

  getQuadrant(x) {
    if (x <= 90) return 0;
    if (x <= 180) return 1;
    if (x <= 270) return 2;
    if (x <= 360) return 3;
    return 4;
  }

  render() {
    const { spinValue, spin, deg } = this.state;
    return (
      <section id="spin">
        {spin ? (
          <button onClick={this.spinClk.bind(this)}>
            <img src="/img/spin/btn-spin.png" aria-disabled="true" />
          </button>
        ) : (
          <div className="result">
            <p>Your Score</p>
            <img
              width="60px"
              height="60px"
              src={`/img/spin/_${spinValue.POSITION}.png`}
            />
            <section>
              <button
                onClick={async () =>
                  await setTimeout(() => {
                    this.setState({ spin: true, spinValue: false });
                  }, 200)
                }
              >
                <label>Spin Again</label>
              </button>
              <button
                style={{ backgroundColor: spinValue.BG_C }}
                onClick={async () =>
                  await setTimeout(() => {
                    downloadObjectAsJSON(
                      JSON.stringify({ POSITION: spinValue.POSITION }),
                      "Result"
                    );
                  }, 200)
                }
              >
                <label>Download Result</label>
              </button>
            </section>
          </div>
        )}
        <img
          src="/img/spin/wheel.png"
          id="wheel"
          style={
            spin
              ? {}
              : {
                  transform: `scale(0.8) rotate(${deg}deg)`,
                  transition: "all 0.4s",
                  marginTop: "170px",
                  transitionDelay: "0.1s",
                }
          }
        />
        <img
          src="/img/spin/ic-marker.png"
          className="marker"
          style={spin ? { display: "none" } : {}}
        />
      </section>
    );
  }
}
