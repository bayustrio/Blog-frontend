import React, {  ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface Layout {
  children: ReactNode;
}

const Layout = (props: Layout) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
