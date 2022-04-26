import Layout from '../layout'
import Narbar from '../narbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../withAuth'
import config from '../config'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Narbar />
            <div className={styles.container}>
            <div className={styles.title}>
                <h1 className={styles.texttitle}><ins><b>User profile</b></ins></h1> 
            </div>
                <div className={styles.showvideo2}>
                    <b>Token:</b> {token.substring(0, 15)}... <br /><br />
                    This route is protected by token, user is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page
                    <br/><br/>
                    <center><img src="/./pic/icon.png" alt="icon" width="200" height="200"></img></center>
                    <h5><b>{JSON.stringify(user)}</b></h5>
                </div>
            </div>
           
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
