import { useState } from 'react'
import Layout from '../layout'
import styles from '../styles/Home.module.css'
import Navbar from '../narbar'
import axios from 'axios'
import config from '../config'

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