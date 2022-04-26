import { useState } from 'react'
import Layout from '../layout'
import Narbar from '../narbar'
import styles from '../styles/floweredit.module.css'
import style from '../styles/Index.module.css'
import useSWR, { mutate } from 'swr';
import withAuth from '../withAuth'
import axios from 'axios';

const URL = `http://localhost/api/flowers`

const fetcher = url => axios.get(url).then(res => res.data);

const floweredit = ({ token }) => {
  const {data} = useSWR(URL,fetcher);
  const [flowers, setFlowers] = useState({})
  const [flower, setFlower] = useState({})
  const [name, setName] = useState(''); 
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [src, setsrc] = useState('http://pngimg.com/uploads/ferrari/ferrari_PNG10680.png');
  
  if(!data){
      console.log(data);
      return <div><h1>Loading...</h1></div>
  }
  const getFlower = async(id)=>{
      let result = await axios.get(`${URL}/${id}`);
      setFlower(result.data);
      mutate(URL);
  }

  const getFlowers=async()=>{
      let result = await axios.get(`${URL}`);
      mutate(URL)
  }
  const addflower = async (name,type,price,src) => {
    let flower = await axios.post(URL, { name,type,price,src})
    console.log(flower.data);
    mutate(URL)
   
  }
  const updateflower = async (id) => {
    let result = await axios.put(`${URL}/${id}`, { name,type,price,src})
    console.log(result);
    mutate(URL)
  }

  const deleteflower = async (id) => {
      let result = await axios.delete(`${URL}/${id}`)
      setFlowers(flower.data)
      mutate(URL)
  }
  

const showflowers =()=>{
        if(data.list && data.list.length){
            return(
            <div>
                {data.list.map((item,index)=>{
                    return(
                        <div>
                            <div className={styles.listItem} key={index}>
                            <center><div><img src={item.src} alt="Flower" width={200} height={200}/></div></center>
                            <div><b>Name:</b> {item.name}</div>
                            <div><b>Type:</b> {item.type} </div>
                            <div><b>Price:</b> {item.price} ฿</div>
                            <div><b>Url:</b> {item.src}</div>
                            <br></br>
                            <div className={styles.edit_button}>
                            <div><center>
                            <button onClick={() => getFlower(item.id)} className={styles.button_get}>Get</button>
                            <button onClick={() => updateflower(item.id)} className={styles.button_update}>Update</button>
                            <button onClick={() => deleteflower(item.id)} className={styles.button_delete}>Delete</button>
                            </center></div></div>
                            </div>
                        </div>
                    )
                })}
                </ div>

            )
              }

    }
    return (
      <Layout>
      <Narbar />
      <div className={styles.container}><div className={styles.text}>
      <h1><ins>Flower Data Edit </ins></h1></div>
          <br></br>
          <br/>
         <div className={styles.show}><b><i><ins>(selected flower)</ins></i></b> <b> &nbsp;Name:</b>{flower.name}<b>&nbsp;Type:</b>{flower.type}&nbsp;<b>Price:</b>{flower.price} ฿.&nbsp;<b>Url Image:</b>{flower.src}</div>
          <div className={styles.form_add}>
          <h2>Add New Flower</h2>
          <label>Name:</label><input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
          <label>Type:</label><input type="text" name="type" onChange={(e) => setType(e.target.value)}/>
          <label>Price:</label><input type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>
          <label>Url Image:</label><input type="text" name="src" onChange={(e) => setsrc(e.target.value)}/>
            <br></br>
            <center><button  className={styles.button_add} onClick={() => addflower(name,type,price,src)} >Add New Flower</button></center>
         </div>
         <div className={style.showflower}>
         <div className={styles.list}>
             <h4><b><i>Show Flowers</i></b></h4>
             {showflowers()} 
          </div>
          </div>
      <br/><br/>
      </div>   

    </Layout>
    )
}

export default withAuth(floweredit)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}