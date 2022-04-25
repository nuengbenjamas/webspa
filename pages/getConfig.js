import config from '../config'
import styles from '../styles/Home.module.css'
import Narbar from '../narbar'

const GetConfig = () => {
    return (
          <div><Narbar />
           <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block xl:inline">Get Configuration from ../config.js <br/><br/><b>Config: </b></span>{' '}
                <span className="block text-indigo-600 xl:inline"> {JSON.stringify(config)}</span>
              </h1>
              <br/>
                    <div className={styles.show}>
                    <ul>
             <li> npm run dev  (for development mode) </li>
             <li>npm run build; npm run start  (for production mode)</li>
              </ul>
        </div>
            </div>
          </main>
        
        </div>
    )
}

export default GetConfig