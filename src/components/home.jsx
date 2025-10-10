import React, { useEffect } from "react";
import { toast } from "react-toastify";
const Home = () => {
  useEffect(() => {
    if (sessionStorage.getItem("showLoginToast")) {
      toast.success("Logged in successfully! 🎉");
     sessionStorage.removeItem("showLoginToast");
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Home</h1>
      </div>
    </>
  );
};

export default Home;
