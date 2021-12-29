import React from "react";
import dynamic from "next/dynamic";

const _Show = dynamic(() => import("../components/_show"), {
  ssr: false,
});

export default class Showdown extends React.Component {
  render() {
    return (
      <section id="showdown">
        <_Show />
      </section>
    );
  }
}
