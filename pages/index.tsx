import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "./layout/Layout";
import styles from '../styles/center.module.css';
import style from '../styles/right.module.css';
import styld from '../styles/left.module.css';
import Content from './post/index';
import {Row,Col} from 'antd';
// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout>
      <div style={{backgroundColor:'#F5F4F4'}} >
          <Content/>
      </div>
    </Layout>
  );
};

export default Home;
