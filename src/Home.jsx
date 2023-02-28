import React from "react";

import { toast } from "react-toastify";

const Home = () => {
  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
  );
};

export default Home;
