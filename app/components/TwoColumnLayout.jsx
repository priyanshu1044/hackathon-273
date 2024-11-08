import React from "react";

const TwoColumnLayout = ({ leftChildren, rightChildren }) => (
  <div className="flex flex-col justify-between  md:flex-row md:justify-between">
    {/* Description */}
    <div className="md:w-5/12 w-full">{leftChildren}</div>
    {/* Chat */}
    <div className="md:w-6/12 w-full min-h-screen">{rightChildren}</div>
  </div>
);

export default TwoColumnLayout;