import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Layout from '../layout'
import Narbar from '../narbar'
import config from '../config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout> 
            <Narbar />
            <div className={styles.showlogin}>
            <div class="text-5xl font-extrabold object-center">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 box-content">Admin Logout</span>
            </div>
            <br />
                <div><h1 className={styles.texth1}>Status: {status} </h1></div>
            </div>
            
        </Layout>
    )
}

