import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { ImExit } from "react-icons/im";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Navbar from '../narbar';
import config from "../config";


export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
          let result = await axios.post(`${config.URL}/login`,{ username, password, remember },{ withCredentials: true });
          console.log("result: ", result);
          console.log("result.data:  ", result.data);
          console.log("token:  ", token);
          setStatus(result.status + ": " + result.data.user.username);
        } 
    catch (e) {
                console.log("error: ", JSON.stringify(e.response));
                setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
              }
  };

  const reMem = async () => {
    setRemember(!remember);
  };
        
  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <>
      {}
      <Navbar />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
          
            <img
              className="mx-auto h-20 w-auto"
              src="https://thumbs.dreamstime.com/b/three-persons-admin-icon-outline-three-persons-admin-vector-icon-color-flat-isolated-three-persons-admin-icon-color-outline-vector-233074232.jpg"
              alt=""
            />
            <br/>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
            </div>
              <div className="text-sm">
                 <a href="logout" className="font-medium text-red-600 text-xl hover:text-red-500"><ImExit/>Log out</a>
              </div>
            </div>
          </div>
          <div>
          <b>Token:</b> {token.substring(0, 15)}...
          <button className="font-medium text-indigo-600 bg-indigo-200  hover:text-indigo-500" onClick={copyText}> Copy token </button>
          </div><div className={styles.text4}><h4><b>Status: <i>{status}</i></b></h4></div>
          <form className="mt-8 space-y-6" action="floweredit" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onClick={reMem}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                 <ins><i>Do not have an account?</i></ins><br></br>
                <a href="/register" className="font-medium text-red-600 hover:text-red-500">
                Register
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={login}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}