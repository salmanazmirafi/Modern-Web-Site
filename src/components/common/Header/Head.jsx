import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB paddingTB">
          <Link to="/">
            {" "}
            <div className="logo">
              <img src="../images/logo.png" alt="" />
            </div>
          </Link>
          <div className="ad ">
            <img src="../images/headerb.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
