import React from "react";
import Discover from "./discover/Discover";
import Hero from "./hero/Hero";
import Homes from "./mainContent/homes/Home";

const Homepages = () => {
  return (
    <div>
      <Hero />
      <Homes />
      <Discover />
    </div>
  );
};

export default Homepages;
