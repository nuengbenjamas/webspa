import Layout from '../layout';
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, {  } from "react";
import styles from "../styles/Home.module.css";
import style from "../styles/Index.module.css";
import Narbar from "../narbar";
const URL = "http://localhost/api/flowers";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
  
  const flowerstore = ({token}) => {
    const {data} = useSWR(URL,fetcher);

    if(!data){
      console.log(data);
      return <div><h1>Loading...</h1></div>
    }

  const buyFlower = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }

  const showFlowers = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div>
            <br/><br/>
            <div className={styles.showstore}>
            <div><img src={item.src} alt="Flower" width={200} height={200}></img></div><br/>
          <div className={style.listItem} key={index}>
            <div><b>Name:</b> {item.name}</div>
            <div><b>Type:</b> {item.type}</div>
            <div><b>Price:</b> {item.price}  ฿.</div>
            <div><b>Url Image:</b> {item.src}</div>
            <div><center><button className={styles.btn} onClick={() => buyFlower(item.id)}>Buy</button></center></div>
          </div>
          </div>
          </div>
        );
      });
    } 
  };
  return (
    <Layout>
    <Narbar />
    <div className={styles.container}>
      <div className={styles.title}>
      <h1 className={style.text}><ins>FlowerStore</ins></h1></div>
      <div className={style.list}>
        {showFlowers()}
      </div>
    </div>
    </Layout>
  );
};

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

export default flowerstore;