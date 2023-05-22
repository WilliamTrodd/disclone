import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./style.css"

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_FB_APP_ID,
}

initializeApp(firebaseConfig)


const app = createApp(App)


app.use(router)

app.mount("#app");
