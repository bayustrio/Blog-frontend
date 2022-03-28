import React,{useEffect} from 'react';
import axios from 'axios';

const index = ({data}) => {
  // console.log(data)
  console.log(data.data, '<<<<')
  // const rsp = data.data.data[0].attributes.cover.json()
  // console.log(rsp)

  return (
    <div>
      {/* <p>{data.data}</p> */}
    </div>
  )
}

export async function getStaticProps() {
  const resp = await axios.get('http://localhost:1337/api/movies')
  const data = await resp.data
  return {
    props: {
      data,
      // cover: data.data.data?.attributes.cover.json()
    },
  }
}



export default index