import React from "react";
import { Stage, Sprite } from "@inlet/react-pixi";
import { Spring } from "react-spring";

export default function show() {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
  });
  return <_show dimensions={dimensions} />;
}

class _show extends React.Component {
  state = { spell: -1, boltOpacity: 0, headerOpacity: 0, footerOpacity: 0 };
  _spell = ["s", "h", "o-1", "w-1", "d", "o-2", "w-2", "n"];

  async componentDidMount() {
    this.headerAnim();
    await setTimeout(async () => {
      this.showDownAnim();
      await setTimeout(() => {
        this.boltAnim();
      }, this._spell.length * 150);
      await setTimeout(() => {
        this.footerAnim();
      }, (this._spell.length / 2) * 150);
    }, 800);
  }

  async headerAnim() {
    await setTimeout(async () => {
      this.setState({ headerOpacity: 1 });
      await setTimeout(async () => {
        this.setState({ headerOpacity: 0.1 });
        await setTimeout(async () => {
          this.setState({ headerOpacity: 1 });
          await setTimeout(async () => {
            this.setState({ headerOpacity: 0.1 });
            await setTimeout(() => {
              this.setState({ headerOpacity: 1 });
            }, 100);
          }, 100);
        }, 100);
      }, 300);
    }, 500);
  }

  boltAnim() {
    this.boltInterval = setInterval(() => {
      let { boltOpacity } = this.state;
      boltOpacity = boltOpacity === 0.3 ? (Math.random() * 5 + 5) / 10 : 0.3;
      this.setState({ boltOpacity });
    }, Math.random() * 100 + 50);
  }

  showDownAnim() {
    const showdownInterval = setInterval(() => {
      const { spell } = this.state;
      if (spell + 1 <= this._spell.length - 1)
        this.setState({ spell: spell + 1 });
      else clearInterval(showdownInterval);
    }, 150);
  }

  async footerAnim() {
    await setTimeout(async () => {
      this.setState({ footerOpacity: 1 });
      await setTimeout(async () => {
        this.setState({ footerOpacity: 0.1 });
        await setTimeout(async () => {
          this.setState({ footerOpacity: 1 });
          await setTimeout(async () => {
            this.setState({ footerOpacity: 0.1 });
            await setTimeout(() => {
              this.setState({ footerOpacity: 1 });
            }, 100);
          }, 100);
        }, 100);
      }, 200);
    }, 400);
  }

  render() {
    const { width, height } = this.props.dimensions;
    const { spell, boltOpacity, headerOpacity, footerOpacity } = this.state;
    return (
      <Stage width={width} height={height}>
        <Sprite image="img/showdown/header.png" x={0} y={0} height={height} />
        {spell <= this._spell.length - 2 ? (
          <Sprite
            image="img/showdown/showdown-off.png"
            x={width * 0.05}
            y={height * 0.1}
            width={width * 0.9}
            height={(height * 0.8 * width * 0.75) / width}
          />
        ) : (
          <></>
        )}
        {spell === -1 ? (
          <></>
        ) : (
          <Sprite
            image={`img/showdown/${this._spell[spell]}@2x.png`}
            x={width * 0.05}
            y={height * 0.1}
            width={width * 0.9}
            height={(height * 0.8 * width * 0.75) / width}
          />
        )}
        <Sprite
          image="img/showdown/vegas@2x.png"
          x={width * 0.1}
          y={height * 0.08}
          width={width * 0.42}
          height={(height * 0.35 * width * 0.75) / width}
          alpha={headerOpacity}
        />
        <Sprite
          image="img/showdown/slots@2x.png"
          x={width * 0.1 + width * 0.44}
          y={height * 0.08}
          width={width * 0.38}
          height={(height * 0.35 * width * 0.75) / width}
          alpha={headerOpacity}
        />
        <Sprite
          image="img/showdown/bolt@2x.png"
          x={width * 0.1 + width * 0.315}
          y={height * 0.005}
          width={width * 0.22}
          height={(height * 0.5 * width * 0.75) / width}
          alpha={boltOpacity}
        />
        <Sprite
          image="img/showdown/must_drop.png"
          x={width * 0.12}
          y={height * 0.5}
          width={width * 0.72}
          height={(height * 0.5  * width * 0.5) / width}
          alpha={footerOpacity}
        />
      </Stage>
    );
  }
}
