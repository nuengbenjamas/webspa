import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div className={styles.gridContainer}>
            <div className={styles.name}>
                <b>Username:</b>
            </div>
            <div>
                <input type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.name}>
                <b>Email:</b>
            </div>
            <div>
                <input type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.name}>
                <b>Password:</b>
            </div>
            <div>
                <input type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
                <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
            </Head> 
            <Navbar />
            <div className={styles.container}>
            <div className={styles.showlogin}>
                <center><h1><ins><i><b>Register</b></i></ins></h1>
                <div><b>Token:</b> {token.substring(0, 15)}...
                <button
                className={styles.btn1}
                        onClick={() => { navigator.clipboard.writeText(token) }}>
                        Copy token
                </button>
                </div>
                </center>
                <br />
                <div className={styles.text4}><h4><b>Status: <i>{status}</i></b></h4></div>
                <br />
                <div className={styles.content}>
                    {registerForm()}
                </div>
                <center>
                <div>
                    <button className={styles.btn}
                    onClick={register}>Register</button>
                </div>
                </center>
            </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}