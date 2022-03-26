import React from "react";
import Image from "next/image";
import Logo from "../../images/logo.png";
import Link from "next/link";
import styles from "../../styles/navbar.module.scss";
// COOKIES
import Cookies from "js-cookie";
import Router from "next/router";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div className={styles.navbar}>
        {/* <div className="container"> */}
        <Link href="/">
          {/* <Image src={Logo} alt="logo" width={100} height={100} /> */}
          We.code
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {Cookies.get("token") === undefined ? null : (
            <li>
              <Link href="/createpost">Create Post</Link>
            </li>
          )}
          {Cookies.get("token") === undefined ? (
            <li>
              <Link href="/register">Register</Link>
            </li>
          ) : null}
          {Cookies.get("token") !== undefined ? (
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  Cookies.remove("token");
                  Cookies.remove("email");
                  Router.push("/login");
                }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
        {/* </div> */}
      </div>
    </>
  );
};

export default Navbar;
