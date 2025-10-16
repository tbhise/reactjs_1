import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="flex grow">
        <div className="kt-wrapper flex grow flex-col min-h-screen">
          <Navbar />
          <main className="grow pt-5" id="content" role="content">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
