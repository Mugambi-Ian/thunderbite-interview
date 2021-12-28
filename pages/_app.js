import "../css/_list.css";

import React from "react";
import Splash from "../components/splash";
import Head from "next/head";


export default function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Thunderbite Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThunderbiteInterview
        child={(props) => <Component {... pageProps} {...props} />}
      />
    </>
  );
}

class ThunderbiteInterview extends React.Component {
  state = {
    splashShown: false,
  };

  render() {
    return (
      <>
        {this.state.splashShown === true ? (
          <this.props.child />
        ) : (
          <main id="splash">
            <Splash
              isShown={() => {
                this.setState({ splashShown: true });
              }}
            />
          </main>
        )}
      </>
    );
  }
}
