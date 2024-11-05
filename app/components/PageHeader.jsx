import React from "react";
import { pressStart2P, instrumentSans } from "../styles/fonts";

const PageHeader = ({ heading, boldText, description }) => {
  return (
    <>
      {/* <h1 className={`${pressStart2P.className} mb-10 text-4xl md:text-3xl lg:text-5xl xl:text-6xl uppercase`}> */}
      <h1 className={`font-bold mb-10 text-4xl md:text-3xl lg:text-5xl xl:text-6xl uppercase`}>

        {heading}
      </h1>
      <p className={`${instrumentSans.className} mb-10`}>
        <strong>{boldText}</strong> {description}
      </p>{" "}
    </>
  );
};

export default PageHeader;