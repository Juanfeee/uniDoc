"use client";

import { ToastContainer } from "react-toastify";
import Header from "../componentes/header";

const Layout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
      <Header />
      <main className="px-4 sm:px-8 py-8">
        <div>{children}</div>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
