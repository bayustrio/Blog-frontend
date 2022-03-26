import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useSelector} from 'react-redux';
import Layout from './layout/Layout';



const Home: NextPage = () => {


  return (
    <Layout>
      <div className={styles.container}>
    </div>
    </Layout>
  )
}

export default Home
