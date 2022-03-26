import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Section, Left, Right,RightMob,Center } from "../Style/home.module";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "./layout/Layout";
import Content from './post/index';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout>
      <div style={{backgroundColor:'#F5F4F4'}} className={styles.mobile}>
      <Section>
        <Left>
          <p>Hello</p>
        </Left>
        <div className={styles.contain}>
          <Content/>
        </div>
        <Right className={styles.rightMobile}>
          <h1>There</h1>
        </Right>
      </Section>
      </div>
    </Layout>
  );
};

export default Home;
